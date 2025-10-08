import React from "react";

interface CourseCardProps {
  title: string;
  description: string;
  certification: string;
  instructorName: string;
  instructorRole: string;
  instructorImage: string;
  lessons: number;
  duration: string;
  reviews: number;
  students: number;
  rating: number; 
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  certification,
  instructorName,
  instructorRole,
  instructorImage,
  lessons,
  duration,
  reviews,
  students,
  rating,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-6 w-full max-w-3xl">
      <div className="flex flex-col gap-2">
        <h4 className="text-gray-900 font-semibold text-xl">{title}</h4>
        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-gray-900 font-semibold text-xl">Certification</h4>
        <p className="text-gray-700 text-base leading-relaxed">{certification}</p>
      </div>

      <hr className="border-gray-200" />

      <div className="flex items-center gap-4">
        <img
          src={instructorImage}
          alt={instructorName}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-blue-600 font-semibold">{instructorName}</span>
          <span className="text-gray-700">{instructorRole}</span>
          <p className="text-gray-700 mt-2">{description}</p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="flex items-center gap-6 text-gray-700 text-sm">
        <div>{lessons} Lessons</div>
        <div>{duration}</div>
        <div>{students} Students</div>
        <div>{reviews} Reviews</div>
        <div>
          {"★".repeat(Math.round(rating)) +
            "☆".repeat(5 - Math.round(rating))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
