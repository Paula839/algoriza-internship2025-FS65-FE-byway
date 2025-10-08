import { useState, useEffect, type ChangeEvent } from "react";
import { FiImage, FiCamera, FiX } from "react-icons/fi";
import StarRating from "../StarRating";
import type { Instructor } from "../../types";
import { addInstructor, updateInstructor } from "../../services/instructorsService";
import { InstructorCategory } from "../../types/enums/InstructorCategory";

interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: () => void;    
  onUpdate?: () => void; 
  mode?: "add" | "view" | "edit";
  instructor?: Instructor | null;
}

const InstructorModal = ({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  mode = "add",
  instructor,
}: InstructorModalProps) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState<InstructorCategory | "">("");
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; title?: string; rate?: string }>({});

  const isViewMode = mode === "view";
  const categories = Object.values(InstructorCategory);

  useEffect(() => {
    if (instructor) {
      setName(instructor.name || "");
      setTitle((instructor.title as InstructorCategory) || "");
      setRate(instructor.rate || 0);
      setDescription(instructor.description || "");
      setPictureUrl(instructor.pictureUrl || null);
    } else {
      setName("");
      setTitle("");
      setRate(0);
      setDescription("");
      setPictureUrl(null);
    }
    setErrors({});
  }, [instructor, mode]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { name?: string; title?: string; rate?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!title) newErrors.title = "Category is required";
    if (rate <= 0) newErrors.rate = "Rate is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const data: Instructor = {
      id: instructor?.id ?? Date.now(),
      name: name.trim(),
      title: title as InstructorCategory,
      description: description.trim() || undefined,
      pictureUrl: pictureUrl || undefined,
      rate: Math.round(rate),
      numberOfCourses: instructor?.numberOfCourses || 0,
      numberOfStudents: instructor?.numberOfStudents || 0,
    };

    try {
      if (mode === "add") {
        await addInstructor(data);
        onAdd?.(); 
      } else if (mode === "edit" && instructor?.id) {
        await updateInstructor(instructor.id, data);
        onUpdate?.(); 
      }
      onClose();
    } catch (err) {
      console.error("Failed to save instructor:", err);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPictureUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="relative bg-white w-[600px] rounded-2xl shadow-lg p-6 z-10 flex flex-col gap-6">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FiX className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-[#202637]">
          {mode === "add" ? "Add Instructor" : mode === "edit" ? "Edit Instructor" : "View Instructor"}
        </h2>

        <div className="relative w-[77px] h-[84px] mt-2">
          <div className="w-[77px] h-[72.8px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {pictureUrl ? <img src={pictureUrl} alt="Profile" className="w-full h-full object-cover" /> : <FiImage className="w-6 h-6 text-gray-400" />}
          </div>
          {!isViewMode && (
            <>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                <FiCamera className="w-5 h-5 text-white" />
              </label>
              <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
            </>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={isViewMode} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"/>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select value={title} onChange={(e) => setTitle(e.target.value as InstructorCategory)} disabled={isViewMode} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100">
                <option value="">Select Category</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="flex flex-col gap-3 w-[200px]">
              <label className="text-sm font-medium text-gray-700">Rate</label>
              <StarRating rating={rate} onChange={isViewMode ? undefined : setRate} />
              {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={isViewMode} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-24 disabled:bg-gray-100"/>
          </div>
        </div>

        {!isViewMode && (
          <div className="flex justify-end gap-3 mt-2 w-full">
            <button onClick={onClose} className="flex items-center justify-center w-[102px] h-[50px] bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-700 font-medium text-base">Cancel</button>
            <button onClick={handleSubmit} className="flex items-center justify-center flex-grow h-[50px] bg-[#020617] rounded-lg text-white font-medium text-base px-6 hover:opacity-90">{mode === "add" ? "Add" : "Update"}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorModal;
