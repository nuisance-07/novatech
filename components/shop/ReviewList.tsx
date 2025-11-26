"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Review {
    _id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewList({ productId, refreshTrigger }: { productId: string, refreshTrigger: number }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/reviews?productId=${productId}`);
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId, refreshTrigger]);

    if (loading) return <div className="text-gray-400">Loading reviews...</div>;

    if (reviews.length === 0) {
        return <div className="text-gray-400 italic">No reviews yet. Be the first to review!</div>;
    }

    const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="text-5xl font-bold text-white">{averageRating}</div>
                <div>
                    <div className="flex gap-1 text-yellow-400 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(Number(averageRating)) ? "fill-current" : "text-gray-600"}`}
                            />
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm">{reviews.length} reviews</p>
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-bold text-white mb-1">{review.userName}</h4>
                                <div className="flex gap-1 text-yellow-400 text-xs">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-3 h-3 ${star <= review.rating ? "fill-current" : "text-gray-600"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
