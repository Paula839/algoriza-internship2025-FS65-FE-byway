import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopCoursesByCategory } from "../../services/coursesService";
import CourseCardImage from "../../assets/images/HomePage/Course.jpg";
import type { Course } from "../../types";
import type { InstructorCategory } from "../../types/enums/InstructorCategory";

interface MoreCoursesProps {
  category: InstructorCategory;
}

const MoreCourses: React.FC<MoreCoursesProps> = ({ category }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!category) return;
    getTopCoursesByCategory(category)
      .then((data) => setCourses(data.slice(0, 4))) 
      .catch((err) => console.error("Error fetching related courses:", err));
  }, [category]);

  if (!courses.length)
    return (
      <div className="mt-12">
        <h2 className="text-gray-900 font-semibold text-[20px] leading-[140%]">
          More Courses Like This
        </h2>
        <p className="text-gray-600 mt-4">No related courses found.</p>
      </div>
    );

  return (
    <div className="flex flex-col mt-12 gap-6">
      <h2 className="text-gray-900 font-semibold text-[20px] leading-[140%]">
        More Courses Like This
      </h2>

      <div className="flex flex-row gap-10 overflow-x-auto">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/course/${course.id}`} 
            className="flex flex-col items-start bg-white border border-gray-200 shadow-md rounded-xl w-[298px] flex-none transition-transform hover:scale-105 duration-300"
          >
            <div className="relative w-full h-[139px] rounded-lg overflow-hidden">
              <img
                src={course.image || CourseCardImage}
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#EEF2FF] text-[#5879DC] px-4 py-1 rounded-full text-[14px] font-medium">
                {course.category}
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-gray-900 font-semibold text-[18px] leading-[160%]">
                {course.name}
              </h3>
              <span className="text-gray-700 font-normal text-[14px] leading-[150%]">
                By {course.instructorName}
              </span>

              <div className="relative w-full h-1 bg-[#E0F2FE] rounded-full mt-2">
                <div className="absolute left-0 top-0 h-1 bg-[#2563EB] rounded-full w-1/3"></div>
              </div>

              <span className="text-gray-900 font-semibold text-[20px] mt-2">
                ${course.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreCourses;
