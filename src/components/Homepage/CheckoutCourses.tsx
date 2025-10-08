import { motion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";
import CheckoutImage from "../../assets/images/HomePage/Checkout.png"; 
import useScrollReveal from "../../hooks/useScrollReveal";

const CheckoutCourses = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`relative w-full flex justify-between items-center max-w-[1123px] mx-auto gap-[165px] py-16 px-4 transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="flex flex-col justify-center items-start gap-4 w-[511px]">
        <div className="flex flex-col items-start gap-2 w-full">
          <h4 className="text-[20px] font-semibold text-black leading-[30px]">
            Transform your life through education
          </h4>
          <p className="text-[16px] font-normal text-gray-800 leading-[26px]">
            Learners around the world are launching new careers, advancing in
            their fields, and enriching their lives.
          </p>
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)", 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="flex flex-row justify-center items-center gap-2 px-6 py-2.5 w-[202px] h-[48px] bg-[#020617] rounded-lg text-white font-medium cursor-pointer"
          onClick={() => (window.location.href = "/courses")}
        >
          <span className="text-[14px] font-medium">Checkout Courses</span>
          <HiArrowNarrowRight className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="relative w-[471.5px] h-[385px] -mr-30">
        <img
          src={CheckoutImage}
          alt="Checkout Courses"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default CheckoutCourses;
