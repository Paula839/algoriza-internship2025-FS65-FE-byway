import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { search } from "../../services/coursesService";
import type { CourseDto } from "../../types/Dtos";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CourseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTopCourses = async () => {
      setLoading(true);
      const topCourses = await search("", 7);
      setResults(topCourses);
      setLoading(false);
    };
    fetchTopCourses();
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    const handler = setTimeout(async () => {
      setLoading(true);
      const res = await search(query, 7);
      setResults(res);
      setLoading(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCourse = (id: number) => {
    navigate(`/course/${id}`);
    setIsDropdownOpen(false); 
  };

  return (
    <div ref={containerRef} className="relative w-[498px]">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsDropdownOpen(true); 
        }}
        placeholder="Search courses"
        className="w-full h-[40px] pl-[30px] pr-[10px] py-[10px] border border-[#D9D9D9] rounded-[8px] 
                   font-inter font-medium text-[14px] leading-[20px] placeholder-[#334155] 
                   focus:outline-none"
      />
      <div className="absolute left-[10px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] flex items-center justify-center">
        <Search className="w-[16px] h-[16px] text-[#334155]" />
      </div>

      {isDropdownOpen && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {loading ? (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          ) : (
            results.map((course) => (
              <li
                key={course.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectCourse(course?.id ?? 0)}
              >
                {course.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
