
import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  size?: number;
  editable?: boolean;
}

const StarRating = ({ 
  rating, 
  setRating, 
  size = 24, 
  editable = true 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`transition-all duration-200 ${editable ? 'cursor-pointer' : ''}`}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
          onClick={() => editable && setRating(star)}
        >
          <Star
            size={size}
            className={`transition-all duration-200 transform ${
              (hoverRating || rating) >= star
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-gray-400'
            } ${
              (hoverRating && hoverRating >= star) ? 'scale-110' : ''
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
