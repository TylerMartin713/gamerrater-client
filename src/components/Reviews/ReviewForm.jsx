import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreateReview } from "../../Services/ReviewService.jsx";

export const ReviewForm = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!review.trim()) {
            setError("Please enter a review before submitting.");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            await CreateReview({
                game_id: parseInt(gameId),
                review: review.trim()
            });
            
            // Redirect back to the game details page
            navigate(`/games/${gameId}`);
        } catch (error) {
            console.error("Error submitting review:", error);
            setError("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(`/games/${gameId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Review Game</h1>
                    <p className="text-lg text-gray-600">Share your thoughts about this game</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-gray-900 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">Write Your Review</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="mb-6">
                            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Review *
                            </label>
                            <textarea
                                id="review"
                                name="review"
                                required
                                rows={8}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
                                placeholder="Share your thoughts about this game. What did you like or dislike? Would you recommend it to others?"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Minimum 10 characters. Be respectful and constructive in your feedback.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting || !review.trim()}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    "Save Review"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
