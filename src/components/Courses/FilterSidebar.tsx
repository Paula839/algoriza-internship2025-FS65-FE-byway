import { useState, useRef } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { InstructorCategory } from "../../types/enums/InstructorCategory";
import { NumOfLectures } from "../../types/enums/NumOfLectures";
import type { FilterDto } from "../../types/Dtos";

const lectures = Object.entries(NumOfLectures).map(([key, val]) => ({
  key,
  label:
    val === "From1To15"
      ? "1 - 15"
      : val === "From16To30"
      ? "16 - 30"
      : val === "From31To45"
      ? "31 - 45"
      : val === "MoreThan45"
      ? "More than 45"
      : val,
}));

// Prepare categories array with labels
const categories = Object.entries(InstructorCategory)
  .filter(([key]) => key !== "DevOps")
  .map(([key, val]) => ({ key, label: val }));

interface FilterSidebarProps {
  onApplyFilter: (dto: FilterDto) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApplyFilter }) => {
  const [showRating, setShowRating] = useState(true);
  const [showLectures, setShowLectures] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showCategory, setShowCategory] = useState(true);

  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLecture, setSelectedLecture] = useState<NumOfLectures | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<InstructorCategory[]>([]);

  const maxPrice = 980;
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDrag = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const rect = slider.getBoundingClientRect();
      let pos = moveEvent.clientX - rect.left;
      pos = Math.max(0, Math.min(pos, rect.width));
      const value = Math.round((pos / rect.width) * maxPrice);

      setPriceRange((prev) => {
        const newRange: [number, number] = [...prev] as [number, number];
        if (index === 0) newRange[0] = Math.min(value, prev[1]);
        else newRange[1] = Math.max(value, prev[0]);
        return newRange;
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const leftPercent = (priceRange[0] / maxPrice) * 100;
  const rightPercent = (priceRange[1] / maxPrice) * 100;

  const Chevron = ({ open }: { open: boolean }) => (
    <FaChevronDown
      className={`text-gray-900 transform transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    />
  );

  const toggleCategory = (key: keyof typeof InstructorCategory) => {
    const categoryValue = InstructorCategory[key];
    setSelectedCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((c) => c !== categoryValue)
        : [...prev, categoryValue]
    );
  };

  const applyFilter = () => {
    const dto: FilterDto = {
      rate: selectedRating || undefined,
      numOfLecturesOption: selectedLecture ?? undefined,
      categories: selectedCategories,
      minimumPrice: priceRange[0],
      maximumPrice: priceRange[1],
      pageNumber: 1,
      pageSize: 9,
    };

    onApplyFilter(dto);
  };

  return (
    <aside className="w-[305px] bg-white p-4 flex flex-col gap-4 border-r border-gray-200">
      <button
        onClick={applyFilter}
        className="flex items-center justify-center gap-2 w-[112px] h-[48px] px-6 py-2 border border-gray-900 rounded-lg bg-white text-gray-900 font-medium text-sm relative"
      >
        <FiFilter className="w-6 h-6" />
        <span>Filter</span>
      </button>

      <div>
        <div
          className="flex justify-between items-center py-6 border-b border-gray-200 cursor-pointer"
          onClick={() => setShowRating(!showRating)}
        >
          <span className="font-medium text-gray-900">Rating</span>
          <Chevron open={showRating} />
        </div>
        {showRating && (
          <div className="flex gap-1 mt-2 cursor-pointer">
            {[1, 2, 3, 4, 5].map((r) => (
              <FaStar
                key={r}
                className={`w-5 h-5 ${r <= selectedRating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <div
          className="flex justify-between items-center py-6 cursor-pointer border-b border-gray-200"
          onClick={() => setShowLectures(!showLectures)}
        >
          <span className="font-medium text-gray-900">Number of Lectures</span>
          <Chevron open={showLectures} />
        </div>
        {showLectures && (
          <div className="flex flex-col gap-2 mt-2">
            {lectures.map((l) => (
              <label key={l.key} className="flex items-center gap-2 cursor-pointer relative">
                <input
                  type="radio"
                  name="lectures"
                  className="w-5 h-5 accent-blue-500"
                  checked={selectedLecture === l.key}
                  onChange={() =>
  setSelectedLecture(selectedLecture === (l.key as NumOfLectures) ? null : (l.key as NumOfLectures))
}

                />
                <span className="text-gray-900">{l.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <div
          className="flex justify-between items-center py-6 cursor-pointer border-b border-gray-200"
          onClick={() => setShowPrice(!showPrice)}
        >
          <span className="font-medium text-gray-900">Price</span>
          <Chevron open={showPrice} />
        </div>
        {showPrice && (
          <div className="relative mt-4 w-full flex flex-col items-center gap-2">
            <div ref={sliderRef} className="relative w-[276px] h-4 bg-gray-300 rounded-full">
              <div
                className="absolute h-4 bg-blue-400 rounded-full"
                style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }}
              ></div>
              <div
                className="absolute top-[-4px] w-5 h-5 bg-blue-500 rounded-full cursor-pointer"
                style={{ left: `calc(${leftPercent}% - 10px)` }}
                onMouseDown={(e) => handleDrag(0, e)}
              ></div>
              <div
                className="absolute top-[-4px] w-5 h-5 bg-blue-500 rounded-full cursor-pointer"
                style={{ left: `calc(${rightPercent}% - 10px)` }}
                onMouseDown={(e) => handleDrag(1, e)}
              ></div>
              <span className="absolute top-6 left-0 text-sm text-gray-500">${priceRange[0]}</span>
              <span className="absolute top-6 right-0 text-sm text-gray-500">${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <div
          className="flex justify-between items-center py-6 cursor-pointer border-b border-gray-200"
          onClick={() => setShowCategory(!showCategory)}
        >
          <span className="font-medium text-gray-900">Category</span>
          <Chevron open={showCategory} />
        </div>
        {showCategory && (
          <div className="flex flex-col gap-2 mt-2">
            {categories.map((c) => (
              <label key={c.key} className="flex items-center gap-2 cursor-pointer relative">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-500"
                  checked={selectedCategories.includes(
                    InstructorCategory[c.key as keyof typeof InstructorCategory]
                  )}
                  onChange={() => toggleCategory(c.key as keyof typeof InstructorCategory)}
                />
                <span className="text-gray-900">{c.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
