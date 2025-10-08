import { useState } from "react";

interface StarRatingProps {
  rating: number; 
  onChange?: (rating: number) => void; 
  maxRating?: number; 
  size?: number; 
  disabled?: boolean; 
}

const StarRating = ({
  rating,
  onChange,
  maxRating = 5,
  size = 20,
  disabled = false,
}: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);

  const getStarType = (index: number) => {
    const active = hovered || rating;
    if (active >= index + 1) return "full";
    if (active >= index + 0.5) return "half";
    return "empty";
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const type = getStarType(i);

        const commonProps = {
          key: i,
          width: size,
          height: size,
          viewBox: "0 0 20 20",
          fill: "currentColor",
          className: `${disabled ? "cursor-not-allowed" : "cursor-pointer"}`,
          onMouseEnter: () => !disabled && setHovered(i + 1),
          onMouseLeave: () => !disabled && setHovered(0),
          onClick: () => !disabled && onChange && onChange(i + 1),
        };

        if (type === "full") {
          return (
            <svg {...commonProps} className="text-yellow-500">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.946c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.946a1 1 0 00-.364-1.118L2.034 9.373c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.287-3.946z" />
            </svg>
          );
        } else if (type === "half") {
          return (
            <svg {...commonProps}>
              <defs>
                <linearGradient id={`halfGrad-${i}`}>
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#CBD5E1" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#halfGrad-${i})`}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.946c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.946a1 1 0 00-.364-1.118L2.034 9.373c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.287-3.946z"
              />
            </svg>
          );
        } else {
          return (
            <svg {...commonProps} className="text-gray-300">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.946c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.946a1 1 0 00-.364-1.118L2.034 9.373c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.287-3.946z" />
            </svg>
          );
        }
      })}
    </div>
  );
};

export default StarRating;
