import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { FaGlobe, FaCode } from "react-icons/fa";
import { AcademicCapIcon, PlayIcon, TrophyIcon } from "@heroicons/react/24/outline";
import InstructorAvatar from "../assets/images/HomePage/Instructor.png";
// import CourseReviews from "../components/Courses/CourseReviews";
import MoreCourses from "../components/Courses/MoreCourses";
import CoursePanel from "../components/Courses/CoursePanel";
import { getCourseById } from "../services/coursesService"; // create this API call\

import type { Course } from "../types";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Course Details", isActive: true },
];

const tabs = ["DESCRIPTION", "INSTRUCTOR", "CONTENT", "REVIEWS"];

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const instructorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState("DESCRIPTION");

  
  const scrollToSection = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "DESCRIPTION":
        descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "INSTRUCTOR":
        instructorRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "CONTENT":
        contentRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "REVIEWS":
        reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  useEffect(() => {
    if (!id) return;
    getCourseById(Number(id))
      .then(setCourse)
      .catch((err) => console.error("Failed to fetch course:", err));
  }, [id]);

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!course) return <p className="text-center mt-20">Loading course...</p>;

  return (
    <div className="min-h-screen bg-gray-50 mt-13 relative">
      <div className="w-full p-6 md:p-12 flex flex-col gap-6 relative">
        <nav className="text-sm text-gray-500 flex gap-2 items-center">
          {breadcrumbItems.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {item.isActive ? (
                <span className="text-gray-900 font-semibold">{item.label}</span>
              ) : (
                <a href={item.href} className="hover:underline">{item.label}</a>
              )}
              {index < breadcrumbItems.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          <div className="flex flex-col gap-4 lg:w-1/2 items-start">
            <h1 className="text-[40px] font-bold text-gray-900 leading-[140%]">{course.name}</h1>
            <p className="text-gray-700 text-[16px] leading-[160%] w-full lg:w-[729px]">{course.description}</p>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${i < course.rate ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="w-px h-4 bg-gray-500"></div>
              <span className="text-gray-700 text-sm">{course.totalHours} Total Hours · {course.level}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <img
                src={InstructorAvatar}
                alt={course.instructorName}
                className="w-10 h-10 rounded-full object-cover object-top"
              />
              <span className="text-gray-700 text-sm">
                Created by <span className="font-semibold">{course.instructorName}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <FaGlobe className="text-gray-700 w-6 h-6" />
              <FaCode className="text-gray-700 w-6 h-6" />
              <span className="text-gray-700 text-sm">{course.category}</span>
            </div>

            <div className="flex gap-6 mt-4">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => scrollToSection(tab)}
                  className={`cursor-pointer flex justify-center items-center px-5 py-4 gap-2 rounded-lg text-sm font-medium ${
                    activeTab === tab
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
                  style={{ width: "148px", height: "57px" }}
                >
                  <span className="text-[14px] font-normal leading-[150%]">{tab}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block absolute top-[10px] left-[250px]">
            <CoursePanel course={course}/>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-8" style={{ width: "840px" }}>
          <div ref={descriptionRef} className="flex flex-col gap-4">
            <h4 className="text-gray-900 font-semibold text-[20px] leading-[150%] h-[30px]">Course Description</h4>
            <p className="text-gray-700 font-normal text-[16px] leading-[160%] h-[78px]">{course.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-gray-900 font-semibold text-[20px] leading-[150%] h-[30px]">Certification</h4>
            <p className="text-gray-700 font-normal text-[16px] leading-[160%] h-[78px]">{course.certifications}</p>
          </div>

          <div ref={instructorRef} className="flex flex-col gap-4 mt-6" style={{ width: "840px" }}>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-blue-600 font-semibold text-[20px] leading-[150%]">{course.instructorName}</span>
              <span className="text-gray-700 font-normal text-[16px] leading-[160%]">{course.category ?? "Instructor"}</span>
            </div>

            <div className="flex gap-6 mt-2 items-start">
              <img
                src={InstructorAvatar}
                alt={course.instructorName}
                className="w-28 h-28 rounded-full object-cover object-top"
              />

              <div className="flex flex-col justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TrophyIcon className="w-6 h-6 text-gray-900" />
                  <span className="text-gray-900 text-[14px] leading-[150%]">
                    {/* {course.reviews?.toLocaleString() ?? 0} Reviews */}
                    Reviews
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-6 h-6 text-gray-900" />
                  <span className="text-gray-900 text-[14px] leading-[150%]">
                    {course.studentsCount ?? 0} Students
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PlayIcon className="w-6 h-6 text-gray-900" />
                  <span className="text-gray-900 text-[14px] leading-[150%]">{course.totalHours} Total Hours</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 font-normal text-[16px] leading-[160%] mt-4 h-[78px]">
              {course.instructorName} is an expert in {course.category} with extensive experience delivering high-quality courses.
            </p>
          </div>

          <div ref={contentRef} className="flex flex-col gap-4 mt-8" style={{ width: "840px" }}>
            <h4 className="text-gray-900 font-semibold text-[20px] leading-[150%] h-[30px]">Content</h4>

            <div className="flex flex-col w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              {course.contents?.map((module, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="font-semibold text-[18px] leading-[160%] text-gray-900">{module.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700 text-[14px]">{module.numOfLectures} Lessons</span>
                    <span className="text-gray-700 text-[14px]">{module.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div ref={reviewsRef} className="mt-8">
            <CourseReviews courseId={course.id} />
          </div> */}
        </div>

        <MoreCourses category={course.category}/>
      </div>
    </div>
  );
};

export default CourseDetails;
