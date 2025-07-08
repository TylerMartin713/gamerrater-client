import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetGameById } from "../../Services/GetGameById.jsx";
import { ReviewList } from "../Reviews/ReviewList.jsx";

export const GameDetails = () => {
  const [game, setGame] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetGameById(id).then(setGame);
  }, [id]);

  if (!game.id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎲</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">Loading game...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Games
      </button>

      {/* Game Details Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-gray-900 p-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {game.title}
          </h1>
          <p className="text-blue-100 text-lg">by {game.designer}</p>
        </div>
        
        {/* Card Body */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Game</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Categories */}
          {game.categories && game.categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {game.categories.map((category) => (
                  <span 
                    key={category.id}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300 shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {category.label}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Game Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Release Year */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {game.year_released}
              </div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Released
              </div>
            </div>
            
            {/* Number of Players */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-800 mb-2">
                {game.number_of_players}
              </div>
              <div className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
                Players
              </div>
            </div>
            
            {/* Play Time */}
            {game.estimated_time_to_play && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-800 mb-2">
                  {game.estimated_time_to_play}
                </div>
                <div className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  Minutes
                </div>
              </div>
            )}
            
            {/* Age Recommendation */}
            {game.age_recommendation && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-800 mb-2">
                  {game.age_recommendation}+
                </div>
                <div className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                  Age
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Game Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Designer:</span>
                <span className="text-gray-800">{game.designer}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Release Year:</span>
                <span className="text-gray-800">{game.year_released}</span>
              </div>
              {game.estimated_time_to_play && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Play Time:</span>
                  <span className="text-gray-800">{game.estimated_time_to_play} minutes</span>
                </div>
              )}
              {game.age_recommendation && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Recommended Age:</span>
                  <span className="text-gray-800">{game.age_recommendation}+ years</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            >
              Back to Games
            </button>
            <button 
              onClick={() => navigate(`/games/${game.id}/review`)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            >
              Review Game
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200">
              Add to Collection
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <ReviewList gameId={game.id} />
      </div>
    </div>
  );
};
