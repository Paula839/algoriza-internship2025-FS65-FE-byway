import { Bell } from "lucide-react";

const InstructorHeader = () => {
  return (
    <header className="flex justify-between items-center w-full h-24 px-6 border-b border-gray-200">
      <h1 className="text-[28px] font-medium text-[#202637]">
        Instructors
      </h1>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1 text-[#626C83] text-sm font-semibold">
          <span>Dashboard</span>
          <span>/</span>
          <span>Instructors</span>
        </div>

        <div className="relative w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full">
          <Bell className="w-6 h-6 text-[#96A0B6]" strokeWidth={2} />
          <span className="absolute top-2 right-3 w-2 h-2 bg-[#E45F5F] border border-white rounded-full"></span>
        </div>
      </div>
    </header>
  );
};

export default InstructorHeader;
