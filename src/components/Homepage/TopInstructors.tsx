import { useState, useRef, useEffect } from "react";
import InstructorImage from "../../assets/images/HomePage/Instructor.png";
import useScrollReveal from "../../hooks/useScrollReveal";
import { getTopInstructors } from "../../services/instructorsService";
import type { Instructor } from "../../types";

const TopInstructors = () => {
  const { ref, isVisible } = useScrollReveal();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;
  const containerRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      const firstCard = containerRef.current.querySelector<HTMLDivElement>("div");
      if (firstCard) {
        const style = getComputedStyle(firstCard);
        const width = firstCard.offsetWidth;
        const marginRight = parseInt(style.marginRight) || 20; 
        setShift(width + marginRight);
      }
    }
  }, [instructors]);

  useEffect(() => {
    const fetchTopInstructors = async () => {
      try {
        const result = await getTopInstructors();
        console.log("Fetched instructors:", result);
        setInstructors(result);
      } catch (err) {
        console.error("Failed to fetch instructors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopInstructors();
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < instructors.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section
      ref={ref}
      className={`w-full flex flex-col gap-8 py-8 px-10 transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="flex justify-between items-center w-full h-[48px]">
        <h3 className="text-[24px] font-semibold text-gray-900">Top Instructors</h3>

        <div className="flex gap-6">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="w-[56px] h-[40px] bg-[#94A3B8] rounded-lg flex justify-center items-center disabled:opacity-50"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= instructors.length}
            className="w-[56px] h-[40px] bg-[#94A3B8] rounded-lg flex justify-center items-center disabled:opacity-50"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden w-full h-[320px]">
        <div
          ref={containerRef}
          className="flex absolute top-0 left-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${-startIndex * shift}px)` }}
        >
          {loading ? (
            <p className="text-gray-500 text-lg">Loading instructors...</p>
          ) : instructors.length === 0 ? (
            <p className="text-gray-500 text-lg">No instructors found.</p>
          ) : (
            instructors.map((inst) => (
              <div
                key={inst.id}
                className="flex flex-col items-center bg-white border border-gray-300 shadow-sm rounded-[16px] w-[260px] h-[320px] p-4 gap-4 mr-[20px]"
              >
                <div className="w-[224px] h-[170px] rounded-[8px] overflow-hidden">
                  <img
                    src={inst.pictureUrl || InstructorImage}
                    alt={inst.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

             <div className="flex flex-col items-center gap-2">
                <h4 className="text-[19px] font-semibold text-gray-900">{inst.name}</h4> {/* slightly bigger */}
                <p className="text-[15px] font-normal text-gray-700">{inst.title}</p> {/* optional slight bump */}

                <div className="border-t border-gray-200 w-full my-2"></div>

                <div className="flex items-center gap-1 w-[200px] justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-5 h-5 inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#EAB308"
                        className="w-5 h-5"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.028 9.378c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.95z" />
                      </svg>
                    </span>
                    <span className="text-[12px] font-semibold text-gray-900">{inst.rate}</span>
                  </div>

                  <span className="text-[12px] font-semibold text-gray-700">
                    {inst.numberOfStudents ?? 0} Students
                  </span>
                </div>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TopInstructors;
