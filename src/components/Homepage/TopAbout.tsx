import { useState, useRef, useEffect } from "react";
import UserImage from "../../assets/images/HomePage/User.jpg";
import useScrollReveal from "../../hooks/useScrollReveal";

import { RiDoubleQuotesL } from "react-icons/ri";

type Review = {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
};

const reviews: Review[] = [
  {
    id: 1,
    quote:
      "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
    name: "Jane Doe",
    role: "Designer",
    image: UserImage,
  },
  {
    id: 2,
    quote:
      "I found the courses very practical and hands-on. They really prepared me for real-world projects and boosted my confidence.",
    name: "John Smith",
    role: "Frontend Developer",
    image: UserImage,
  },
  {
    id: 3,
    quote:
      "The instructors are knowledgeable and approachable. I loved how the content was structured and easy to follow.",
    name: "Alice Johnson",
    role: "UI/UX Designer",
    image: UserImage,
  },
  {
    id: 4,
    quote:
      "Amazing experience! The support and resources provided helped me master skills I never thought I could.",
    name: "Bob Lee",
    role: "Backend Developer",
    image: UserImage,
  },
  {
    id: 5,
    quote:
      "I highly recommend Byway courses to anyone who wants to grow in tech quickly and effectively.",
    name: "Emily Davis",
    role: "Fullstack Developer",
    image: UserImage,
  },
  {
    id: 6,
    quote:
      "The content is clear, concise, and practical. I applied what I learned immediately at work.",
    name: "Michael Brown",
    role: "DevOps Engineer",
    image: UserImage,
  },
  {
    id: 7,
    quote:
      "Excellent teaching methods and hands-on exercises. I feel more confident in my projects now.",
    name: "Sophia Wilson",
    role: "Frontend Developer",
    image: UserImage,
  },
  {
    id: 8,
    quote:
      "Byway has transformed the way I approach learning. Their structured courses keep me motivated.",
    name: "Liam Miller",
    role: "AI Specialist",
    image: UserImage,
  },
  {
    id: 9,
    quote:
      "Friendly instructors, up-to-date content, and practical exercises—Byway has it all.",
    name: "Olivia Anderson",
    role: "UI Designer",
    image: UserImage,
  },
  {
    id: 10,
    quote:
      "The courses are very interactive and engaging. I never thought learning could be this fun.",
    name: "Noah Thomas",
    role: "Software Tester",
    image: UserImage,
  },
  {
    id: 11,
    quote:
      "Byway helped me land my dream job. The real-world projects were a game changer.",
    name: "Ava Jackson",
    role: "Backend Developer",
    image: UserImage,
  },
  {
    id: 12,
    quote:
      "The platform is easy to navigate, and the explanations are excellent. Highly satisfied!",
    name: "Ethan White",
    role: "Frontend Developer",
    image: UserImage,
  },
  {
    id: 13,
    quote:
      "Byway’s learning experience is unmatched. I feel ready for any challenge in tech now.",
    name: "Mia Harris",
    role: "UI/UX Designer",
    image: UserImage,
  },
];

const TopAbout = () => {
  const { ref, isVisible } = useScrollReveal();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const containerRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstCard = containerRef.current.querySelector<HTMLDivElement>(
        "div"
      );
      if (firstCard) {
        const style = getComputedStyle(firstCard);
        const width = firstCard.offsetWidth;
        const marginRight = parseInt(style.marginRight) || 20; 
        setShift(width + marginRight);
      }
    }
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < reviews.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section
      ref={ref}
      className={`w-full bg-[#F8FAFC] py-16 px-10 flex flex-col gap-8 transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[24px] font-semibold text-gray-900">
          What Our Customer Say <br /> About Us
        </h3>

        <div className="flex gap-6">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="w-[56px] h-[40px] bg-[#94A3B8] rounded-lg flex justify-center items-center disabled:opacity-50"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= reviews.length}
            className="w-[56px] h-[40px] bg-[#94A3B8] rounded-lg flex justify-center items-center disabled:opacity-50"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden w-full h-[290px]">
        <div
          ref={containerRef}
          className="flex absolute top-0 left-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${-startIndex * shift}px)` }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-gray-300 shadow-sm rounded-[16px] w-[530px] h-[290px] p-6 flex flex-col justify-between mr-[23px]"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center mb-4">
                  <RiDoubleQuotesL className="w-6 h-6 text-white" />
                </div>
                <p className="text-[16px] font-normal text-gray-900 leading-[26px]">
                  {rev.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-[18px] font-semibold text-gray-900">
                    {rev.name}
                  </span>
                  <span className="text-[14px] font-normal text-gray-700">
                    {rev.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAbout;
