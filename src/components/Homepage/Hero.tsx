import HeroDots from "./HeroDots";
import Image1 from "../../assets/images/HomePage/image1.png";
import Image2 from "../../assets/images/HomePage/image2.png";
import Image3 from "../../assets/images/HomePage/image3.png";
import Image4 from "../../assets/images/HomePage/image4.png";
import Image5 from "../../assets/images/HomePage/image5.png";
import Image6 from "../../assets/images/HomePage/image6.png";
import Image7 from "../../assets/images/HomePage/image7.png";
import Image8 from "../../assets/images/HomePage/image8.png";
import useScrollReveal from "../../hooks/useScrollReveal";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

interface HeroCircleProps {
  img: string;
  circleColor: string;
  circleTop: number;
  circleLeft: number;
  circleSize: number;
  imageWidth: number;
  imageHeight: number;
  imgClassName?: string;
}

const HeroCircle = ({
  img,
  circleColor,
  circleTop,
  circleLeft,
  circleSize,
  imageWidth,
  imageHeight,
  imgClassName = "",
}: HeroCircleProps) => {
  const imageTop = circleTop + circleSize - imageHeight;
  const imageLeft = circleLeft - (imageWidth - circleSize) / 2;
  return (
    <>
      <div
        className="absolute rounded-full"
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          top: `${circleTop}px`,
          left: `${circleLeft}px`,
          background: circleColor,
          zIndex: 0,
        }}
      />

      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          top: `${imageTop}px`,
          left: `${imageLeft}px`,
          zIndex: 10,
        }}
      >
        <img
          src={img}
          alt="Hero Circle"
          className={`w-full h-full object-contain object-bottom ${imgClassName}`}
        />
      </div>
    </>
  );
};

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const navigate = useNavigate();
  
  return (
    <main
      ref={ref}
      className={`pt-[168.5px] px-20 relative transition-all duration-1000 ease-out
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    `}
    >
      <h1 className="font-inter font-bold text-[40px] leading-[48px] text-[#0F172A] max-w-[483px]">
        Unlock Your Potential with Byway
      </h1>

      <p className="mt-4 font-inter font-normal text-[16px] leading-[160%] text-[#334155] max-w-[592px]">
        Welcome to Byway, where learning knows no bounds. We believe that
        education is the key to personal and professional growth, and we're here
        to guide you on your journey to success.
      </p>

      <motion.button
        whileHover={{
          scale: 1.01,
          y: -2,
          boxShadow: "0px 10px 25px rgba(59, 130, 246, 0.5)", 
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="mt-6 w-[169px] h-[48px] bg-[#3B82F6] rounded-[8px] px-[24px] py-[10px] flex items-center justify-center text-white font-inter font-medium text-[14px] leading-[160%] cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Start your journey
      </motion.button>

      <section className="relative min-h-[600px]">
        <div className="-z-10">
          <HeroDots />
        </div>

        <HeroCircle
          img={Image1}
          circleColor="#F87171"
          circleTop={-250}
          circleLeft={950}
          circleSize={270}
          imageWidth={272}
          imageHeight={350}
        />

        <HeroCircle
          img={Image3}
          circleColor="#60A5FA"
          circleTop={-330}
          circleLeft={1250}
          circleSize={270}
          imageWidth={280}
          imageHeight={350}
        />

        <HeroCircle
          img={Image2}
          circleColor="#FACC15"
          circleTop={-40}
          circleLeft={1250}
          circleSize={270}
          imageWidth={330}
          imageHeight={360}
          imgClassName="transform -scale-x-100"
        />

        <div
          className="absolute bg-black rounded-full"
          style={{
            width: "35px",
            height: "35px",
            top: "-81px",
            left: "1257px",
            opacity: 1,
            zIndex: 5,
          }}
        />

        <div
          className="absolute rotate-45 bg-white"
          style={{
            width: "15px",
            height: "15px",
            top: "-71px", 
            left: "1267px", 
            opacity: 1,
            zIndex: 6,
          }}
        />

        <div
          className="absolute bg-white rounded-[8px] shadow-md px-3 py-2 flex flex-col"
          style={{
            width: "167px",
            height: "104px",
            top: "110px",
            left: "1178px",
            opacity: 1,
            zIndex: 10,
          }}
        >
          <div className="flex items-center mb-4 space-x-1">
            {[Image4, Image5, Image6, Image7, Image8].map((img, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full overflow-hidden border border-gray-300"
              >
                <img
                  src={img}
                  alt={`Avatar ${idx + 4}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <p className="font-inter font-semibold text-[12px] leading-[15px] text-[#0F172A]">
            Join our community of 1200+ Students
          </p>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
