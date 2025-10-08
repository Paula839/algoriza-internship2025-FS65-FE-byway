import { StarIcon } from "@heroicons/react/24/solid";
import CourseImage from "../../assets/images/HomePage/Course.jpg";
import useScrollReveal from "../../hooks/useScrollReveal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTopCourses } from "../../services/coursesService";
import type { Course } from "../../types";
import { useNavigate } from "react-router-dom";

const TopCourses = () => {
  const { ref, isVisible } = useScrollReveal();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopCourses = async () => {
      const result = await getTopCourses();
      setCourses(result);
      setLoading(false);
    };
    fetchTopCourses();
  }, []);

  return (
    <section
      ref={ref}
      className={`w-full flex flex-col gap-8 py-8 px-10 transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    `}
    >
      <div className="flex justify-between items-center w-full h-[48px]">
        <h3 className="text-[24px] font-semibold text-gray-900">Top Courses</h3>

        <motion.button
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="flex items-center justify-center gap-2 px-6 h-12 rounded-lg border border-blue-500 text-blue-500 font-medium cursor-pointer"
          onClick={() => navigate("/courses")}
        >
          View All
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-8 justify-start">
        {loading ? (
          <p className="text-gray-500 text-lg">Loading top courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500 text-lg">No courses found.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="flex flex-col items-start bg-white border border-gray-200 shadow-sm rounded-[16px] w-[298px] h-[338px] p-4 gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-[139px] rounded-lg overflow-hidden">
                <img
                  src={course.image || CourseImage}
                  alt={course.name || "Course"}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-[18px] font-semibold text-gray-900">
                  {course.name}
                </h4>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < (course.rate ?? 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-[14px] text-gray-700">{course.totalHours + " Total Hours"}</p>

              <p className="text-[20px] font-semibold text-gray-900">
                {course.price}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TopCourses;
