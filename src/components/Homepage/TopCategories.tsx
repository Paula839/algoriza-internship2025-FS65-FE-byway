import {
  AcademicCapIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  CpuChipIcon,
  CloudIcon,
  CommandLineIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

import { getTopCategories } from "../../services/categoriesService";
import type { Category as ApiCategory } from "../../types";
import { StarIcon } from "@heroicons/react/24/solid";

const ICONS = [
  <AcademicCapIcon className="w-10 h-10 text-[#3B82F6]" />,
  <CodeBracketIcon className="w-10 h-10 text-[#3B82F6]" />,
  <BriefcaseIcon className="w-10 h-10 text-[#3B82F6]" />,
  <PuzzlePieceIcon className="w-10 h-10 text-[#3B82F6]" />,
  <CloudIcon className="w-10 h-10 text-[#3B82F6]" />,
  <CpuChipIcon className="w-10 h-10 text-[#3B82F6]" />,
  <CommandLineIcon className="w-10 h-10 text-[#3B82F6]" />,
  <LightBulbIcon className="w-10 h-10 text-[#3B82F6]" />,
];

type CategoryCard = {
  id: number;
  title: string;
  courseCount: number;
  averageRating: number;
  icon: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
};

const TopCategories = () => {
  const { ref, isVisible } = useScrollReveal();
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const containerRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstCard = containerRef.current.querySelector<HTMLDivElement>("div");
      if (firstCard) {
        const style = getComputedStyle(firstCard);
        const width = firstCard.offsetWidth;
        const marginRight = parseInt(style.marginRight) || 25;
        setShift(width + marginRight);
      }
    }
  }, [categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result: ApiCategory[] = await getTopCategories(8);
        const cards: CategoryCard[] = result.map((cat, idx) => ({
          id: idx + 1,
          title: cat.category,
          courseCount: cat.courseCount,
          averageRating: cat.averageRating,
          icon: ICONS[idx],
          bgColor: "bg-[#E0F2FE]",
          borderColor: "border-[#3B82F6]",
        }));
        setCategories(cards);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < categories.length) setStartIndex(startIndex + 1);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  return (
    <section
      ref={ref}
      className={`w-full flex flex-col gap-8 py-8 px-10 transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="flex justify-between items-center w-full h-[48px]">
        <h3 className="text-[24px] font-semibold text-gray-900">Top Categories</h3>

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
            disabled={startIndex + itemsPerPage >= categories.length}
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

      <div className="relative overflow-hidden w-full h-[240px]">
        <div
          ref={containerRef}
          className="flex absolute top-0 left-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${-startIndex * shift}px)` }}
        >
          {loading ? (
            <p className="text-gray-500 text-lg">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500 text-lg">No categories found.</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col items-center justify-center bg-white border border-gray-300 shadow-sm rounded-[16px] w-[320px] h-[240px] p-6 gap-4 mr-[115px]"
              >
                <div
                  className="relative w-[100px] h-[100px] rounded-full flex items-center justify-center"
                  style={{ background: "#E0F2FE" }}
                >
                  {cat.icon}
                  <div className={`absolute inset-0 border-[3.3333px] rounded-full ${cat.borderColor}`}></div>
                </div>
                <h4 className="text-[20px] font-semibold text-gray-900 mt-2">{cat.title}</h4>
                <p className="text-[16px] font-normal text-gray-700 flex items-center gap-1">
                  {cat.courseCount} Courses • <StarIcon className="w-4 h-4 text-yellow-400 inline-block" />{" "}
                  {cat.averageRating.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
