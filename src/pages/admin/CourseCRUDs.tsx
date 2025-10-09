import AdminLayout from "../../components/AdminLayout";
import { useState, useEffect } from "react";
import { Upload, Plus, ArrowLeft, Trash2 } from "lucide-react";
import StarRating from "../../components/StarRating";
import { useNavigate, useLocation } from "react-router-dom";

import type {Course, Content} from "../../types/"

import { InstructorCategory } from "../../types/enums/InstructorCategory";
import { Level } from "../../types/enums/Level";
import { getInstructor } from "../../services/instructorsService";
import { addCourse, updateCourse } from "../../services/coursesService";
import { uploadImage } from "../../services/uploadService";


interface CourseCRUDsProps {
  mode: "add" | "view" | "update";
}

const CourseCRUDs = ({ mode }: CourseCRUDsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseDataFromState: Course | null = location.state?.courseData || null;

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");


  const [course, setCourse] = useState<Course>({
    name: "",
    category: "FrontendDevelopment",
    level: "AllLevels",
    instructorName: "",
    price: 0.0,
    totalHours: 0.0,
    rate: 1,
    description: "",
    certifications: "",
    image: "",
    contents: [{ name: "", numOfLectures: 0, duration: 0 }],
  });

  useEffect(() => {
    if (courseDataFromState) {
      setCourse({
        ...courseDataFromState,
        contents: courseDataFromState.contents || [{ name: "", numOfLectures: 0, duration: 0 }],
      });
    }
  }, [courseDataFromState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, PNG, or GIF images are allowed.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setCourse((prev) => ({ ...prev, image: previewUrl }));

    try {
      const uploadedUrl = await uploadImage(file); 
      setCourse((prev) => ({ ...prev, image: uploadedUrl })); 
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Try again.");
    }
  }
};
  const handleContentChange = (index: number, field: keyof Content, value: string) => {
    const newContents = [...course.contents];
    if (field === "name") {
      newContents[index].name = value;
    } else if (field === "numOfLectures") {
      newContents[index].numOfLectures = Number(value);
    } else if (field === "duration") {
      newContents[index].duration = Number(value);
    }
    
    const totalHours = newContents.reduce((sum, c) => sum + c.duration, 0);

    setCourse((prev) => ({ ...prev, contents: newContents, totalHours: totalHours }));
  };

  const addContent = () => {
    setCourse((prev) => ({
      ...prev,
      contents: [...prev.contents, { name: "", numOfLectures: 0, duration: 0 }],
    }));
  };

  const removeLastContent = () => {
    if (course.contents.length > 1) {
      setCourse((prev) => ({
        ...prev,
        contents: prev.contents.slice(0, -1),
      }));
    }
  };

  const validateStep = async (): Promise<boolean> => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!course.name.trim()) newErrors.name = "Course name is required";
      if (!course.instructorName.trim()) newErrors.instructorName = "Instructor name is required";

      const instructorExists = await getInstructor(course.instructorName);
      if (!instructorExists) newErrors.instructorName = "Instructor does not exist";
      course.instructorId = instructorExists?.id
      if (course.price <= 0) newErrors.price = "Price must be positive";
    }

    if (step === 2) {
      course.contents.forEach((c, idx) => {
        if (!c.name.trim()) newErrors[`contentName${idx}`] = "Content name is required";
        if (c.numOfLectures <= 0) newErrors[`numOfLectures${idx}`] = "Must be positive";
        if (c.duration <= 0) newErrors[`duration${idx}`] = "Must be positive";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!(await validateStep())) return;
    if (step === 1) setStep(2);
    else {
      setLoading(true);
      try {

        

        if (mode === "add") {
          const response = await addCourse(course);
          if (response) setSuccessMessage("Course added successfully!");
        } else if (mode === "update" && courseDataFromState?.id) {
          const response = await updateCourse(courseDataFromState.id, course);
          if (response) setSuccessMessage("Course updated successfully!");
        }
       setTimeout(() => navigate("/admin/courses"), 1500);
      } catch (err) {
        console.error(err);
        alert("Something went wrong while saving the course.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };


  const handleCancel = () => {
    navigate("/admin/courses");
  };

  const isViewMode = mode === "view";

  return (
    <AdminLayout>
      <div className="flex flex-col w-full max-w-[1073px] h-auto px-8 py-6 gap-8">
        <div className="flex items-center gap-4 w-full h-8">
          {step === 2 && (
            <button onClick={handleBack} className="flex items-center justify-center w-6 h-6">
              <ArrowLeft size={21} className="text-[#202637]" />
            </button>
          )}
          <h1 className="text-[24px] font-medium text-[#202637] font-sans">
            {mode === "add" ? "Add Course" : mode === "update" ? "Update Course" : "View Course"}
          </h1>
          <span className="text-[16px] font-medium text-[#626C83] font-sans">Step {step} of 2</span>
        </div>

        {step === 1 && (
          <>
            <h2 className="text-[20px] font-semibold text-[#202637]">Course Details</h2>

       <div className="flex flex-row items-center p-6 gap-8 w-full h-[181px] border border-[#DBE4FF] rounded-lg">
  {course.image ? (
    <div className="relative w-[245px] h-[133px]">
      <img
        src={course.image}
        alt="Course Preview"
        className="w-full h-full object-cover border border-[#E2E6EE] rounded-lg"
      />
      {!isViewMode && (
        <button
          type="button"
          onClick={() => setCourse((prev) => ({ ...prev, image: "" }))}
          className="absolute top-2 right-2 bg-white text-red-500 border border-red-500 rounded-full px-2 py-[2px] text-xs hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>
      )}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center p-8 gap-2 w-[245px] h-[133px] bg-[#F2F4F5] border border-[#E2E6EE] rounded-lg">
      <Upload size={24} className="text-[#737F8E]" />
      <span className="text-[#737F8E] font-medium text-[14px]">Upload Image</span>
    </div>
  )}

  <div className="flex flex-col justify-center gap-4">
    <span className="text-[#202637] font-medium text-[18px]">
      Size: 700x430 pixels
    </span>
    <span className="text-[#202637] font-medium text-[18px]">
      File Support: .jpg, .jpeg, .png, or .gif
    </span>
    {!isViewMode && (
      <label className="flex items-center justify-center gap-2 w-[147px] h-[48px] border border-[#5879DC] rounded-lg text-[#5879DC] font-medium cursor-pointer hover:bg-[#F0F4FF] transition">
        <Upload size={16} />
        Upload Image
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    )}
  </div>
</div>

            <div className="flex flex-col gap-6 w-full mt-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#626C83] font-medium">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={handleChange}
                  disabled={isViewMode}
                  className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  placeholder="Enter course name"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Category</label>
                  <select
                    name="category"
                    value={course.category}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    
                  >
                 <option value="">Select category</option>
                    {Object.values(InstructorCategory)
                      .filter((cat) => cat !== "DevOps")
                      .map((cat) => {
                        let label = cat.replace(/([A-Z])/g, " $1").trim();
                        if (cat === "UXUIDesign") label = "UX/UI Design";
                        return (
                          <option key={cat} value={cat}>
                            {label}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Level</label>
                  <select
                    name="level"
                    value={course.level}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  >
                    {Object.values(Level)
                      .map((level) => {
                        return (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Instructor</label>
                  <input
                    type="text"
                    name="instructorName"
                    value={course.instructorName}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    placeholder="Enter instructor name"
                  />
                  {errors.instructorName && <span className="text-red-500 text-sm">{errors.instructorName}</span>}

                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Cost ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    placeholder="Enter course price"
                    min={0}
                  />

                  {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}

                </div>
              </div>

              <div className="flex gap-6">
                {/* <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Total Hours</label>
                  <input
                    type="number"
                    name="totalHours"
                    value={course.totalHours}
                    onChange={handleChange}
                    disabled={isViewMode}
                    className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    placeholder="Enter total hours"
                    min={0}
                  />
                  {errors.totalHours && <span className="text-red-500 text-sm">{errors.totalHours}</span>}

                </div> */}
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Rate</label>
                  <StarRating
                    rating={course.rate}
                    onChange={(val) => setCourse((prev) => ({ ...prev, rate: val }))}
                    size={24}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Description</label>
                  <textarea
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    disabled={isViewMode}
                    rows={4}
                    className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    placeholder="Enter course description"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[#626C83] font-medium">Certification</label>
                  <textarea
                    name="certifications"
                    value={course.certifications}
                    onChange={handleChange}
                    disabled={isViewMode}
                    rows={4}
                    className={`w-full border border-[#F1F3F9] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    placeholder="Enter certification details"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-[20px] font-semibold text-[#202637]">Add Content</h2>

            {course.contents.map((c, index) => (
              <div key={index} className="flex flex-col gap-4 p-4 rounded-lg border border-gray-200">
                <div className="flex flex-col gap-2">
                  <label className="text-[#626C83] font-medium">Content Name</label>
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => handleContentChange(index, "name", e.target.value)}
                    placeholder="Enter content name"
                    disabled={isViewMode}
                    className={`w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />

                  {errors[`contentName${index}`] && <span className="text-red-500 text-sm">{errors[`contentName${index}`]}</span>}
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[#626C83] font-medium">Lectures Number</label>
                    <input
                      type="number"
                      value={c.numOfLectures}
                      onChange={(e) => handleContentChange(index, "numOfLectures", e.target.value)}
                      placeholder="Enter number of lectures"
                      disabled={isViewMode}
                      className={`flex-1 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      min={0}
                    />
                    {errors[`numOfLectures${index}`] && <span className="text-red-500 text-sm">{errors[`numOfLectures${index}`]}</span>}

                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[#626C83] font-medium">Duration</label>
                    <input
                      type="text"
                      value={c.duration}
                      onChange={(e) => handleContentChange(index, "duration", e.target.value)}
                      placeholder="Enter duration"
                      disabled={isViewMode}
                      className={`flex-1 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isViewMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      
                    />
                    {errors[`duration${index}`] && <span className="text-red-500 text-sm">{errors[`duration${index}`]}</span>}
                  </div>
                </div>
              </div>
            ))}

            {!isViewMode && course.contents.length > 1 && (
              <button
                onClick={removeLastContent}
                className="flex items-center justify-center w-[56px] h-[50px] bg-[#FDEEEE] rounded-lg mt-2"
              >
                <Trash2 size={24} className="text-[#EB5757]" />
              </button>
            )}

            {!isViewMode && (
              <button
                onClick={addContent}
                className="flex items-center justify-center gap-2 mt-4 w-full max-w-[1025px] h-[54px] px-3 py-[14px] bg-[#ECEEF0] border border-dashed border-[#ACB5C0] shadow-[0_4px_14px_rgba(0,0,0,0.05)] rounded-lg hover:bg-[#E0E3E6] transition"
              >
                <Plus size={16} className="text-[#202637]" />
                <span className="text-[#202637] font-semibold text-[13px] leading-[16px]">
                  Add Another Content
                </span>
              </button>
            )}
          </>
        )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="flex items-center justify-center w-[102px] h-[50px] bg-[#FDEEEE] rounded-lg text-[#EB5757] font-medium text-[16px] hover:bg-[#F9D7D7] transition"
            >
              Cancel
            </button>

          {step === 1 &&
            <button 
              onClick={handleNext}
              className="flex items-center justify-center flex-1 h-[50px] bg-[#020617] rounded-lg text-white font-medium text-[16px] hover:bg-[#141219] transition"
            >  
               Next
            </button>
          }

          {step === 2 && !isViewMode &&
            <button 
              onClick={handleNext}
              className="flex items-center justify-center flex-1 h-[50px] bg-[#020617] rounded-lg text-white font-medium text-[16px] hover:bg-[#141219] transition"
            >  
               {loading ? "Submitting..." : "Submit"}
            </button>
          }   
          {successMessage && (
          <div className="bg-green-100 text-green-800 py-2 px-4 rounded mb-4">
            {successMessage}
          </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

export default CourseCRUDs;
