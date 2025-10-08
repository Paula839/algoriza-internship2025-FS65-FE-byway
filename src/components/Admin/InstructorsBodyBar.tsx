import { Search } from "lucide-react";

const InstructorsBodyBar = () => {
  return (
    <div className="flex justify-between items-center w-full px-8 mt-6">
      <div className="flex items-center gap-2">
        <h3 className="text-[24px] font-medium leading-[30px] text-[#202637]">
          Instructors
        </h3>
        <div className="flex flex-col justify-center items-center bg-[#EEF0F3] rounded-full px-3 py-1.5">
          <span className="text-[16px] font-medium text-[#7E8CA0]">
            200
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 w-45/100">
        <button className="flex justify-center items-center w-[142px] h-[44px] bg-[#020617] rounded-[8px] text-white font-medium text-[14px] leading-[21px] hover:bg-[#11121B]">
          Add Instructor
        </button>

        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#626C83]" />
          <input
            type="text"
            placeholder="Search instructors..."
            className="w-full border border-[#F1F3F9] rounded-lg py-3 pl-10 pr-4 text-sm text-[#626C83] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorsBodyBar;
