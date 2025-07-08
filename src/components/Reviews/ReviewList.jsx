import { useState, useEffect } from "react";
import { GetGameReviews } from "../../Services/ReviewService.jsx";

export const ReviewList = ({ gameId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const reviewData = await GetGameReviews(gameId);
                setReviews(reviewData);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError("Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        if (gameId) {
            fetchReviews();
        }
    }, [gameId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading reviews...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>
                <div className="text-center py-8">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Reviews ({reviews.length})
            </h3>
            
            {reviews.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">💭</div>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">No reviews yet</h4>
                    <p className="text-gray-500">Be the first to share your thoughts about this game!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                            {/* Review Header */}
                            <div className="flex items-start space-x-4 mb-3">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {getInitials(review.player.first_name, review.player.last_name)}
                                    </div>
                                </div>
                                
                                {/* User Info */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-semibold text-gray-900">
                                            {review.player.first_name} {review.player.last_name}
                                        </h4>
                                        <span className="text-gray-500 text-sm">@{review.player.username}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        {formatDate(review.created_on)}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Review Content */}
                            <div className="ml-14">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {review.review}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
