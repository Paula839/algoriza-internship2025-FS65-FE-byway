import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CourseImage from "../../assets/images/HomePage/Course.jpg";
import type { Course, Content } from "../../types";
import type { FilterDto } from "../../types/Dtos";
import { filter as filterCourses } from "../../services/coursesService";

const ITEMS_PER_PAGE = 9;

interface CoursesSectionProps {
  filter?: FilterDto | null;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ filter }) => {
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async (pageNumber: number) => {
    try {
      setLoading(true);

      const dto: FilterDto = {
        ...(filter ?? {}),
        pageNumber,
        pageSize: ITEMS_PER_PAGE,
      };

      const result = await filterCourses(dto);

      if (result?.items) {
        const mappedCourses: Course[] = result.items.map((dto) => ({
          id: dto.id,
          name: dto.name,
          description: dto.description ?? "",
          category: dto.category,
          image: dto.image || CourseImage,
          price: dto.price,
          rate: dto.rate,
          totalHours: dto.contents?.reduce((sum: number, c: Content) => sum + (c.numOfLectures || 0), 0) ?? 0,
          level: dto.level,
          instructorName: dto.instructorName || "Unknown Instructor",
          contents: dto.contents || [],
        }));

        setCourses(mappedCourses);
        setTotalPages(Math.ceil(result.totalCount / ITEMS_PER_PAGE));
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let pageNumber = Number(page) || 1;
    if (pageNumber < 1 || isNaN(pageNumber)) {
      pageNumber = 1;
      navigate("/courses/1", { replace: true });
    }
    setCurrentPage(pageNumber);
    fetchCourses(pageNumber);
  }, [page, filter]);

  const goToPage = (pageNumber: number) => navigate(`/courses/${pageNumber}`);
  const handlePrev = () => currentPage > 1 && goToPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && goToPage(currentPage + 1);

  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) range.push(i);
    if (range[0] > 1) range.unshift(1, -1);
    if (range[range.length - 1] < totalPages) range.push(-1, totalPages);
    return range;
  };

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col items-center gap-6 p-6">
      {loading ? (
        <p className="text-gray-500 text-lg">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500 text-lg">No courses found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="cursor-pointer flex flex-col items-start bg-white border border-gray-200 shadow-sm rounded-[16px] p-4 gap-3 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative w-full h-[160px] rounded-lg overflow-hidden">
                  <img
                    src={course.image || CourseImage}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[18px] font-semibold text-gray-900">{course.name}</h4>
                  <p className="text-[14px] text-gray-700">{course.instructorName}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${i < course.rate ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-[14px] text-gray-700">{course.totalHours} Total Hours. {course.level}</p>
                <p className="text-[20px] font-semibold text-gray-900">${course.price}</p>
              </div>
            ))}
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
                <span key={idx} className="px-2">...</span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-[43px] h-[41px] flex items-center justify-center border border-gray-300 ${
                    currentPage === pageNum ? "bg-blue-500 text-white font-semibold" : "bg-white text-gray-700"
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
        </>
      )}
    </section>
  );
};

export default CoursesSection;
