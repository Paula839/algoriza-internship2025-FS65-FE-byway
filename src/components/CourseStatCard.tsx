import { Users } from "lucide-react";
import React from "react";

interface CourseStatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

const CourseStatCard: React.FC<CourseStatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex-1 min-w-[347px] h-[140px] flex flex-col justify-center items-end p-5 gap-4 bg-white border border-[#F0F0F0] shadow-[0px_4px_14px_rgba(167,167,167,0.12)] rounded-2xl">
      <div className="flex flex-col items-start gap-1 w-full h-full">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-[40px] font-medium text-black leading-[56px]">
            {value}
          </span>

          <div className="flex items-center justify-center w-12 h-12 bg-[rgba(88,168,220,0.12)] shadow-[0px_4px_14px_rgba(255,255,255,0.08)] rounded-lg">
            {icon ? icon : <Users className="w-7 h-7 text-[#5879DC]" />}
          </div>
        </div>

        <div className="w-full flex items-center">
          <span className="text-lg font-medium text-black">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseStatCard;