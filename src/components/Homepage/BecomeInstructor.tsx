import BecomeInstructorImage from "../../assets/images/HomePage/BecomeInstructor.png"; 
import { HiArrowNarrowRight } from "react-icons/hi";
import useScrollReveal from "../../hooks/useScrollReveal";

const BecomeInstructor = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
    ref={ref}
    className={`"relative w-full flex justify-between items-center px-10 py-16 max-w-[1123px] mx-auto transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      >
      
      <div className="relative w-[400px] h-[425px] -ml-20">
        <img
          src={BecomeInstructorImage}
          alt="Instructor"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-start gap-4 w-[549px] -mr-20">
        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-[20px] font-semibold text-black leading-[30px]">
            Become an Instructor
          </h4>
          <p className="text-[16px] font-normal text-gray-800 leading-[26px]">
            Instructors from around the world teach millions of students on Byway.
            We provide the tools and skills to teach what you love.
          </p>
        </div>

        <button className="flex flex-row justify-center items-center gap-2 px-6 py-2.5 w-[273px] h-[48px] bg-[#020617] rounded-lg text-white font-medium">
          <span className="text-[14px] font-medium">
            Start Your Instructor Journey
          </span>
          <HiArrowNarrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default BecomeInstructor;
