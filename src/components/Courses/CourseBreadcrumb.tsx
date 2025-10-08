import { ChevronRightIcon } from "@heroicons/react/24/solid";

type BreadcrumbItem = {
  label: string;
  href?: string;
  isActive?: boolean; 
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const CourseBreadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href && !item.isActive ? (
            <a href={item.href} className="text-gray-700 hover:text-blue-600">
              {item.label}
            </a>
          ) : (
            <span className={item.isActive ? "text-blue-600" : "text-gray-700"}>
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-900" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default CourseBreadcrumb;
