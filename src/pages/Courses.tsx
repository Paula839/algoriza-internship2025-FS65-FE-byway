import { useState } from "react";
import FilterSidebar from "../components/Courses/FilterSidebar";
import CoursesSection from "../components/Courses/CoursesSection";
import { SortBy } from "../types/enums/SortBy";
import type { FilterDto } from "../types/Dtos";

const Courses = () => {
  const sortOptions = Object.values(SortBy);

  const [filterDto, setFilterDto] = useState<FilterDto | null>(null);

  const [selectedSort, setSelectedSort] = useState<SortBy>(SortBy.HighestRated);

  const handleFilter = (dto: FilterDto) => {
    console.log("Filter DTO:", dto);
    setFilterDto({ ...dto, sortBy: selectedSort });
    
  };

  const handleSortChange = (sort: SortBy) => {
    setSelectedSort(sort);
    if (filterDto) {
      setFilterDto({ ...filterDto, sortBy: sort });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 md:px-20 mt-8">
      <div className="py-15">
        <h1 className="text-gray-900 font-bold text-[40px] leading-[120%] text-left">
          Design Courses
        </h1>

        <h2 className="mt-2 text-[#0F172A] font-semibold text-[24px] leading-[140%] text-left w-[294px]">
          All Development Courses
        </h2>
      </div>

      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-[250px]">
          <FilterSidebar onApplyFilter={handleFilter} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-end mb-4 gap-2">
            <span className="font-normal text-base text-gray-900">Sort By</span>

            <div className="relative w-[160px]">
              <select
                className="appearance-none w-full px-4 py-2 pr-10 h-12 bg-white border border-gray-400 rounded-lg font-medium text-sm text-gray-900 cursor-pointer"
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value as SortBy)}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <CoursesSection filter={filterDto} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
