'use client'
import { useState } from "react";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Review } from '../Interface/Interface'

interface ReviewCutProps {
    review: Review;
}

export default function ReviewCut({ review }: ReviewCutProps) {
    const [Expanded, setExpanded] = useState(false)

    const contentToShow = Expanded ? review.body : review.body.slice(0, 1);

    const toggleExpand = () => {
        setExpanded(prev => !prev);
    }

    return (
        <div>
            <div className='rating'>{review.rating}</div>
            <h1 className="font-bold text-black text-4xl">{review.Title}</h1>
            {review.categories && review.categories.length > 0 && (
                <p className="text-gray-600 italic my-2">
                    {review.categories.map(cat => cat.Name).join(', ')}
                </p>
            )}
            {review.body && (<BlocksRenderer content={contentToShow} />)}

            {<button onClick={toggleExpand} className="text-purple-600 underline hover:text-purple-500 transition-colors">
                {Expanded ? 'Thu gọn' : 'Xem tiếp'}
            </button>
            }
        </div>
    );
}