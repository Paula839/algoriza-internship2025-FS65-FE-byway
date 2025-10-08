import {
  LayoutDashboard,
  Users,
  FolderKanban,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoImage from "../../assets/icons/logo.png";
import { useAuth } from "../../context/AuthContext";
const Sidebar = () => {
  const { logout } = useAuth();
  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/admin" },
    { label: "Instructors", icon: <Users size={20} />, to: "/admin/instructors" },
    { label: "Courses", icon: <FolderKanban size={20} />, to: "/admin/courses" },
  ];

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();        
    navigate("/");   
  };

  return (
    <aside className="w-[287px] h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <img src={LogoImage} alt="Byway" className="w-8 h-8" />
        <span className="text-lg font-semibold text-gray-700">Byway Admin</span>
      </div>

      <nav className="flex flex-col gap-2 px-4 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-gray-100">
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
