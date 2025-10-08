import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-[120px] font-extrabold text-[#5879DC] leading-none">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-500 mt-2 mb-8 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-[#5879DC] text-white rounded-lg hover:bg-[#4665c8] transition"
      >
        <HomeIcon size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
