import { Bell } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  breadcrumb?: string[]; 
}

const AdminHeader = ({ title, breadcrumb }: AdminHeaderProps) => {
  return (
    <header className="w-full flex items-center justify-between border-b border-gray-200 py-6 px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-[28px] font-medium leading-[30px] text-[#202637]">
          {title}
        </h1>

        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1 text-[#626C83] text-sm font-semibold">
            {breadcrumb.map((item, index) => (
              <span key={index}>
                {item}
                {index < breadcrumb.length - 1 && " / "}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full">
        <Bell className="w-6 h-6 text-[#96A0B6]" strokeWidth={2} />
        <span className="absolute top-2 right-3 w-2 h-2 bg-[#E45F5F] border border-white rounded-full"></span>
      </div>
    </header>
  );
};

export default AdminHeader;
