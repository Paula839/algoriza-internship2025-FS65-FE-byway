import AdminLayout from "../../components/AdminLayout";
import { Bell } from "lucide-react";
import { EyeIcon, PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "../../components/StarRating";
import DeleteConfirmModal from "../../components/Admin/DeleteConfirmModal";
import { getCourses, deleteCourse, searchPagination as searchCourses } from "../../services/coursesService";
import type { Content, Course } from "../../types";
import DEFAULT_IMAGE from "../../assets/images/HomePage/Course.jpg";
import CourseImage from "../../assets/images/HomePage/Course.jpg";
import type { CourseDto } from "../../types/Dtos";

const ITEMS_PER_PAGE = 8;

const CoursesPage = () => {
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [deleteErrors, setDeleteErrors] = useState<{ [courseId: number]: string }>({});

  const fetchCourses = async (pageNumber: number) => {
    try {
      if (search.trim()) setSearching(true);
      else setLoading(true);

      const result = search.trim()
        ? await searchCourses(search, pageNumber, ITEMS_PER_PAGE)
        : await getCourses(pageNumber, ITEMS_PER_PAGE);

        let mappedCourses: Course[] = [];

      if (Array.isArray(result)) {
        mappedCourses = result.map((dto: CourseDto) => ({
          id: dto.id,
          name: dto.name,
          description: dto.description ?? "",
          category: dto.category,
          image: dto.pictureUrl || CourseImage,
          price: dto.price,
          rate: dto.rate,
          totalHours:
            dto.contents?.reduce((sum: number, c: Content) => sum + (c.numOfLectures || 0), 0) ?? 0,
          level: dto.level,
          instructorName: dto.instructorName || "Unknown Instructor",
          contents: dto.contents || [],
        }));
      } else if (result && "items" in result) {
      mappedCourses = (result.items as CourseDto[]).map((dto) => ({
          id: dto.id,
          name: dto.name,
          description: dto.description ?? "",
          category: dto.category,
          image: dto.pictureUrl || CourseImage,
          price: dto.price,
          rate: dto.rate,
          totalHours:
            dto.contents?.reduce((sum: number, c: Content) => sum + (c.numOfLectures || 0), 0) ?? 0,
          level: dto.level,
          instructorName: dto.instructorName || "Unknown Instructor",
          contents: dto.contents || [],
        }));


        setCourses(mappedCourses);
        setTotalPages(
          result.totalCount
            ? Math.ceil(result.totalCount / (result.pageSize || ITEMS_PER_PAGE))
            : 1
        );
        setTotalCourses(result.totalCount || mappedCourses.length);
      } else {
        setCourses([]);
        setTotalPages(1);
        setTotalCourses(0);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

useEffect(() => {
  const pageNumber = Number(page) || 1;
  if (pageNumber < 1 || isNaN(pageNumber)) {
    navigate("/admin/courses/1", { replace: true });
    return;
  }
  setCurrentPage(pageNumber);
  fetchCourses(pageNumber);
}, [page]);

  // ✅ Debounced search
useEffect(() => {
  if (search.trim() === "") {
    fetchCourses(currentPage);
    return;
  }

  const delayDebounce = setTimeout(() => {
    fetchCourses(1); 
  }, 400);

  return () => clearTimeout(delayDebounce);
}, [search]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    navigate(`/admin/courses/${pageNumber}`);
  };

  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (range[0] > 1) range.unshift(1, -1);
    if (range[range.length - 1] < totalPages) range.push(-1, totalPages);
    return range;
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await deleteCourse(courseToDelete.id ?? 0);
      await fetchCourses(currentPage);
      setDeleteErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[courseToDelete.id!];
        return newErrors;
      });
    } catch (err) {
      const message = "Failed to delete course";
      setDeleteErrors((prev) => ({
        ...prev,
        [courseToDelete.id!]: message,
      }));
      console.error("Failed to delete course:", err);
    } finally {
      setCourseToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const openAddPage = () => navigate("/admin/courses/add");
  const openViewPage = (course: Course) =>
    navigate(`/admin/courses/view/${course.id}`, { state: { courseData: course } });
  const openEditPage = (course: Course) =>
    navigate(`/admin/courses/edit/${course.id}`, { state: { courseData: course } });

  return (
    <AdminLayout key={currentPage}>
      <div className="flex justify-between items-center w-full h-24 px-8 border-b border-gray-200">
        <h1 className="text-[28px] font-medium text-[#202637]">Courses</h1>
        <div className="relative w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full">
          <Bell className="w-6 h-6 text-[#96A0B6]" strokeWidth={2} />
          <span className="absolute top-2 right-3 w-2 h-2 bg-[#E45F5F] border border-white rounded-full"></span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full px-8 mt-6">
        <div className="flex items-center gap-2">
          <h3 className="text-[24px] font-medium text-[#202637]">Courses</h3>
          <div className="flex justify-center items-center bg-[#EEF0F3] rounded-full px-3 py-1.5">
            <span className="text-[16px] font-medium text-[#7E8CA0]">
              {totalCourses}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-[60%]">
          <button
            onClick={openAddPage}
            className="flex justify-center items-center w-[142px] h-[44px] bg-[#020617] rounded-[8px] text-white font-medium text-[14px] hover:bg-[#11121B]"
          >
            Add Course
          </button>

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-[#F1F3F9] rounded-lg py-3 pl-4 text-sm text-[#626C83] focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-start gap-[40px] px-8 mt-8">
        {loading || searching ? (
          <div className="w-full text-gray-500 text-center py-20">
            {searching ? "Searching courses..." : "Loading courses..."}
          </div>
        ) : courses.length === 0 ? (
          <div className="w-full text-gray-500 text-center py-20">
            {search.trim() ? "No matching courses found." : "No courses found."}
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              onClick={() => openViewPage(course)}
              className="flex flex-col w-[293px] bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <div className="relative w-full h-[139px] rounded-t-lg overflow-hidden">
                <img
                  src={course.image || DEFAULT_IMAGE}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-4 py-1 bg-[#EEF2FF] rounded-full text-[#5879DC] text-[14px] font-medium">
                  {course.category}
                </div>
              </div>

              <div className="flex flex-col p-4 gap-1">
                <h3 className="text-[18px] font-semibold text-[#0F172A]">{course.name}</h3>
                <p className="text-[14px] font-normal text-[#334155]">
                  By {course.instructorName || "Unknown"}
                </p>

                <div className="flex flex-col mt-1">
                  <div className="flex items-center gap-2 pointer-events-none">
                    <StarRating rating={course.rate} disabled />
                  </div>
                  <p className="text-[14px] text-[#334155] mt-1">
                    {course.totalHours} Total Hours · {course.contents.length} Lectures ·{" "}
                    {course.level}
                  </p>
                </div>

                <span className="text-[20px] font-semibold text-[#0F172A] mt-2">
                  ${course.price}
                </span>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openViewPage(course);
                    }}
                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditPage(course);
                    }}
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(course);
                    }}
                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>

                {deleteErrors[course.id!] && (
                  <div className="text-red-600 text-sm mt-2 px-2">
                    {deleteErrors[course.id!]}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center mt-6 bg-white shadow-sm rounded-md h-[41px] gap-1">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-[43px] border border-gray-300 rounded-l-md disabled:opacity-50"
        >
          <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
        </button>
        {getPageNumbers().map((pageNum, idx) =>
          pageNum === -1 ? (
            <span key={idx} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`w-[43px] h-[41px] flex items-center justify-center border border-gray-300 ${
                currentPage === pageNum
                  ? "bg-blue-500 text-white font-semibold"
                  : "bg-white text-gray-700"
              }`}
            >
              {pageNum}
            </button>
          )
        )}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[43px] border border-gray-300 rounded-r-md disabled:opacity-50"
        >
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteCourse}
        name={courseToDelete?.name || ""}
      />
    </AdminLayout>
  );
};

export default CoursesPage;
