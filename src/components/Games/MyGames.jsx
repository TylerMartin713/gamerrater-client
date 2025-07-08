import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetMyGames } from "../../Services/GetMyGamesServ.jsx";

export const MyGames = () => {
    const [myGames, setMyGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyGames = async () => {
            try {
                setLoading(true);
                const games = await GetMyGames();
                setMyGames(games);
            } catch (error) {
                console.error("Error fetching my games:", error);
                setError("Failed to load your games");
            } finally {
                setLoading(false);
            }
        };

        fetchMyGames();
    }, []);

    const handleEditGame = (gameId) => {
        navigate(`/games/${gameId}/edit`);
    };

    const handleViewGame = (gameId) => {
        navigate(`/games/${gameId}`);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <h3 className="text-xl font-medium text-gray-600">Loading your games...</h3>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-medium text-gray-600 mb-2">Error Loading Games</h3>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Games</h1>
                        <p className="text-lg text-gray-600">
                            Games you've added to the collection ({myGames.length})
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/creategame')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Game
                    </button>
                </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myGames.map((game) => (
                    <div key={game.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-emerald-500 to-gray-900 p-4">
                            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                                {game.title}
                            </h3>
                            <p className="text-blue-100 text-sm">by {game.designer}</p>
                        </div>
                        
                        {/* Card Body */}
                        <div className="p-4">
                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {game.description}
                            </p>

                            {/* Game Stats */}
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Released
                                    </span>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {game.year_released}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Players
                                    </span>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {game.number_of_players}
                                    </span>
                                </div>
                                
                                {game.estimated_time_to_play && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Play Time
                                        </span>
                                        <span className="text-sm font-semibold text-gray-700">
                                            {game.estimated_time_to_play} min
                                        </span>
                                    </div>
                                )}
                                
                                {game.age_recommendation && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Age
                                        </span>
                                        <span className="text-sm font-semibold text-gray-700">
                                            {game.age_recommendation}+
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Categories */}
                            {game.categories && game.categories.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {game.categories.slice(0, 3).map((category) => (
                                            <span 
                                                key={category.id}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                                            >
                                                {category.label}
                                            </span>
                                        ))}
                                        {game.categories.length > 3 && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                +{game.categories.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Card Footer */}
                        <div className="px-4 pb-4">
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleViewGame(game.id)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                                >
                                    View Details
                                </button>
                                <button 
                                    onClick={() => handleEditGame(game.id)}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Empty State */}
            {myGames.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🎲</div>
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No games yet</h3>
                    <p className="text-gray-500 mb-6">You haven't added any games to your collection.</p>
                    <button
                        onClick={() => navigate('/creategame')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Your First Game
                    </button>
                </div>
            )}
        </div>
    );
};