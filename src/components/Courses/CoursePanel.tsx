import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Socials from "../../assets/images/HomePage/socials.png";
import DefaultCourseImage from "../../assets/images/HomePage/Course.jpg";
import type { Course } from "../../types";
import { myCourses } from "../../services/usersService";
import { useNavigate } from "react-router-dom";

interface CoursePanelProps {
  course: Course;
}

const CoursePanel = ({ course }: CoursePanelProps) => {
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<number[]>([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      if (!user) return;
      const ids = await myCourses();
      if (ids) setPurchasedCourseIds(ids);
    };
    fetchPurchasedCourses();
  }, [user]);

  const courseImage = course.image || DefaultCourseImage;
  const alreadyInCart = isInCart(course?.id ?? 0);
  const alreadyPurchased = purchasedCourseIds.includes(course?.id ?? 0);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!alreadyInCart && !alreadyPurchased) addToCart(course);
  };

 const handleBuyNow = () => {
  
  if (!user) {
    navigate("/login");
    return;
  }

  if(alreadyInCart || alreadyPurchased) return;

  addToCart(course);
  

  navigate("/checkout");
};

  

  return (
    <div
      className="absolute bg-white border border-gray-200 shadow-sm rounded-[16px]"
      style={{
        width: "480px",
        height: "700px",
        left: "960px",
        top: "90px",
        boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.12)",
      }}
    >
      <div
        className="rounded-[8px] overflow-hidden mx-auto"
        style={{
          width: "420px",
          height: "200px",
          marginTop: "24px",
          backgroundImage: `url(${courseImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="flex flex-col gap-6 mt-[32px] items-center">
        <div className="flex justify-start items-center w-[90%]">
          <span className="font-semibold text-[28px] leading-[140%] text-gray-900">
            ${course.price.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col gap-4 w-[80%] items-center">
          <button
            onClick={handleAddToCart}
            disabled={alreadyInCart || alreadyPurchased}
            className={`flex justify-center items-center w-full h-[56px] rounded-[8px] font-medium text-[16px] leading-[160%] ${
              alreadyInCart || alreadyPurchased
                ? "bg-[#D9D9D9] text-white cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {alreadyPurchased
              ? "Already Purchased"
              : alreadyInCart
              ? "Added to Cart"
              : "Add to Cart"}
          </button>

         <button
          onClick={handleBuyNow}
          className="flex justify-center items-center w-full h-[56px] border border-gray-900 rounded-[8px] text-gray-900 font-medium text-[16px] leading-[160%] hover:bg-gray-100"
        >
          Buy Now
        </button>
        </div>
      </div>

      <div className="absolute left-0 top-[520px] w-full h-0 border-t border-gray-200"></div>

      <div className="flex flex-col gap-2 absolute left-[24px] top-[540px] items-start w-[80%]">
        <span className="text-gray-900 font-medium text-[16px] leading-[160%]">
          Share
        </span>
        <div
          className="w-full h-[52px] bg-cover bg-center rounded-[8px] mt-2 ml-5"
          style={{ backgroundImage: `url(${Socials})` }}
        ></div>
      </div>
    </div>
  );
};

export default CoursePanel;
