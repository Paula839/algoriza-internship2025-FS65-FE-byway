import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface CourseHeaderProps {
  title: string;
  stepText?: string;
}

const CourseHeader: FC<CourseHeaderProps> = ({ title, stepText }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between w-full mb-8">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(-1)}>
        <div className="w-6 h-6 transform scale-x-[-1]">
          <div className="w-2 h-2 border-t-2 border-l-2 border-black rotate-[-45deg]"></div>
        </div>
        <h1 className="text-[24px] font-medium text-[#202637]">{title}</h1>
      </div>

      {stepText && <span className="text-[16px] text-[#626C83]">{stepText}</span>}
    </div>
  );
};

export default CourseHeader;
