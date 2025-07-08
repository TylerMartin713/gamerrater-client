import { useEffect, useState } from "react";
import { GetAllGames } from "../../Services/GetAllGamesServ.jsx";
import { useNavigate } from "react-router-dom";

export const AllGames = () => {
  const [allGames, setAllGames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetAllGames().then(setAllGames);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        All Games
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allGames.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-gray-900 p-4">
              <h2
                className="text-xl font-bold text-white truncate"
                title={game.title}
              >
                {game.title}
              </h2>
              <p className="text-blue-100 text-sm">by {game.designer}</p>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {game.description}
              </p>

              {/* Game Details */}
              <div className="space-y-2">
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
            </div>

            {/* Card Footer */}
            <div className="px-4 pb-4">
              <button
                className="w-full bg-gray-800 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => navigate(`/games/${game.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {allGames.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎲</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No games found
          </h3>
          <p className="text-gray-500">
            Start by adding some games to your collection!
          </p>
        </div>
      )}
    </div>
  );
};
