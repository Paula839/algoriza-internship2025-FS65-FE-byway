import { Star } from "phosphor-react";
import Image1 from "../../assets/images/HomePage/Image1.png";
import Image2 from "../../assets/images/HomePage/Image2.png";
import Image3 from "../../assets/images/HomePage/Image3.png";


interface Review {
  id: number;
  name: string;
  avatar: string; 
  rating: number; 
  date: string;
  comment: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Mark Doe",
    avatar: Image3,
    rating: 5,
    date: "Reviewed on 22nd March, 2024",
    
    comment:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: Image1,
    rating: 4,
    date: "Reviewed on 18th February, 2024",
    comment:
      "Great course! Learned a lot about UI/UX principles. Some sections could be a bit more detailed, but overall highly recommended.",
  },
    {
    id: 3,
    name: "Alice Johnson",
    avatar: Image2,
    rating: 5,
    date: "Reviewed on 5th April, 2024",
    comment:
      "Absolutely loved this course! The exercises were practical and helped me build a strong portfolio. The instructor was very supportive and responsive to questions.",
  },
];

const summaryStars = [
  { rating: 5, percent: "80%" },
  { rating: 4, percent: "10%" },
  { rating: 3, percent: "5%" },
  { rating: 2, percent: "3%" },
  { rating: 1, percent: "2%" },
];

const renderSummaryStarRow = (rating: number, percent: string) => (
  <div className="flex flex-row items-center gap-2 w-[137px] h-[20px]" key={rating}>
    <div className="flex flex-row items-start gap-[3px] w-[100px] h-[20px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          weight="fill"
          size={20}
          className={i < rating ? "text-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
    <span className="text-gray-700 font-normal text-[14px] leading-[120%] flex items-center">
      {percent}
    </span>
  </div>
);

const renderStars = (rating: number) => {
  return [...Array(5)].map((_, i) => (
    <Star
      key={i}
      weight="fill"
      size={20}
      className={i < rating ? "text-yellow-400" : "text-gray-300"}
    />
  ));
};

const CourseReviews = () => {
  return (
    <div className="flex flex-col gap-6 w-full mt-12">
      <h4 className="text-gray-900 font-semibold text-[20px] px-8">
        Learner Reviews
      </h4>

      <div className="flex w-full px-8 gap-32">
        <div className="flex flex-col gap-4 w-[186px] h-[177px]">
          <h2 className="text-gray-900 font-semibold text-[20px] leading-[140%]">
            5.0
          </h2>
          <span className="text-gray-700 text-sm">146,951 reviews</span>

          <div className="flex flex-col gap-2 mt-2">
            {summaryStars.map((s) => renderSummaryStarRow(s.rating, s.percent))}
          </div>
        </div>

        <div className="flex flex-col gap-6 ml-auto -mt-20">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-row gap-8 w-[1470px] p-8 bg-white border border-gray-200 rounded-xl"
            >
              <div className="flex flex-row items-center gap-4 w-[250px]">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-24 h-24 rounded-full object-cover object-top"
                />
                <span className="font-semibold text-gray-900 text-lg">
                  {review.name}
                </span>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex flex-row items-center gap-2">
                  {renderStars(review.rating)}
                </div>
                <span className="text-gray-700 text-sm">{review.date}</span>
                <p className="text-gray-700 text-base leading-[160%]">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseReviews;
