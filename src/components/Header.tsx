import { ShoppingCart, LogOut } from "lucide-react";
import SearchBar from "./Homepage/SearchBar";
import LogoImage from "../assets/icons/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = () => {
    logout(); 
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="w-full mx-auto flex items-center justify-between h-[72px] px-[80px] py-4">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={LogoImage}
              alt="Byway Logo"
              className="w-[31px] h-[40px] object-contain mr-[1px]"
            />
          </Link>
          <span className="font-inter font-medium text-[16px] text-[#334155] ml-[1px] mr-[94px]">
            Byway
          </span>
        </div>

        <div className="flex items-center flex-1">
          <div className="relative flex items-center w-full max-w-[498px] h-[40px]">
            <SearchBar />
          </div>
          <Link
            to="/courses"
            className="font-inter font-medium text-[14px] leading-[20px] text-[#334155] ml-6 hover:text-[#1e293b] cursor-pointer"
          >
            Courses
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2.5 border border-[#334155] rounded-[8px] font-inter font-medium text-[14px] text-[#334155] hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2.5 rounded-[8px] bg-[#334155] font-inter font-medium text-[14px] text-white hover:bg-slate-700"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/shoppingCart")}
                className="relative w-[24px] h-[24px]"
              >
                <ShoppingCart className="w-5 h-5 text-[#334155]" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E75252] text-white text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center border border-white font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="w-[24px] h-[24px] flex items-center justify-center hover:opacity-80"
              >
                <LogOut
                  className="w-[17px] h-[16px] text-[#7E8CA0]"
                  strokeWidth={1.5}
                />
              </button>

              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center text-white font-medium text-[16px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
