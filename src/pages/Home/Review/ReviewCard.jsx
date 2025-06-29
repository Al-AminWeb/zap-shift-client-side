import React from "react";
import reviewQuote from "../../../assets/reviewQuote.png";
const ReviewCard = ({ review }) => {
    return (
        <div className="card  px-8  shadow-sm rounded-4xl">
            <div className="card-body">
                <img className="h-10 w-10" src={reviewQuote} alt="" />
                <p className="text-gray-500 font-semibold">
                    {review.review}
                </p>
                <div className="border border-dashed w-full border-[#03373d]"></div>
                <div className="flex gap-2 items-center">
                    <div className="h-12 w-12 rounded-full   flex items-center justify-center">
                        <img className="h-full w-full rounded-full" src={review.user_photoURL} alt="" />
                    </div>
                    <div>
                        <h1 className="font-bold text-[#03373d]">{review.userName}</h1>
                        <p className="text-gray-500 text-xs font-semibold">{review.profession}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;