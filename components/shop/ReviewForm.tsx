"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function ReviewForm({ productId, onReviewSubmitted }: { productId: string, onReviewSubmitted: () => void }) {
    const { user, isLoaded } = useUser();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    userName: user?.fullName || "Guest User",
                    userId: user?.id,
                    rating,
                    comment,
                }),
            });

            if (res.ok) {
                setComment("");
                setRating(5);
                onReviewSubmitted();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to submit review");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) return null;

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold mb-6">Write a Review</h3>

            {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Review</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-primary focus:outline-none min-h-[120px]"
                    placeholder="What did you like or dislike?"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
}
