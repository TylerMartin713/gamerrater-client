import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-gray-900/10"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Hero Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-gray-900 bg-clip-text text-transparent">
                GAMER RATER
              </span>
            </h1>
            
            {/* Hero Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover, rate, and share your favorite board games with a community of passionate gamers
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate('/games')}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🎲 Explore Games
              </button>
              <button
                onClick={() => navigate('/creategame')}
                className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-emerald-300"
              >
                ➕ Add a Game
              </button>
            </div>

            {/* Hero Image/Icon */}
            <div className="text-8xl md:text-9xl mb-12 animate-bounce">
              🎯🎲🃏
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Gamer Rater?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our community and discover your next favorite board game
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Extensive Library</h3>
              <p className="text-gray-600">
                Browse through hundreds of board games with detailed information, ratings, and reviews from fellow gamers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rate & Review</h3>
              <p className="text-gray-600">
                Share your thoughts and experiences with games you've played. Help others discover hidden gems!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Connect with other board game enthusiasts and build your personal collection of favorites.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-600 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Board Games</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1K+</div>
              <div className="text-xl opacity-90">Reviews</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-xl opacity-90">Active Gamers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Games Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Games
            </h2>
            <p className="text-lg text-gray-600">
              Check out some of the most loved games in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Sample Game Cards */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-gray-900 p-4">
                <h3 className="text-lg font-semibold text-white">Settlers of Catan</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">
                  Build settlements and cities in this classic strategy game of trade and development.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-medium">⭐ 4.5/5</span>
                  <span className="text-gray-500">234 reviews</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-gray-900 p-4">
                <h3 className="text-lg font-semibold text-white">Wingspan</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">
                  A beautiful engine-building game about birds and their habitats.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-medium">⭐ 4.8/5</span>
                  <span className="text-gray-500">189 reviews</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-gray-900 p-4">
                <h3 className="text-lg font-semibold text-white">Azul</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">
                  Create beautiful tile patterns in this elegant puzzle game.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-medium">⭐ 4.6/5</span>
                  <span className="text-gray-500">156 reviews</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/games')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
            >
              View All Games
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Rating?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of board game enthusiasts and start discovering your next favorite game today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/mygames')}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              My Collection
            </button>
            <button
              onClick={() => navigate('/games')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Browse Games
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

