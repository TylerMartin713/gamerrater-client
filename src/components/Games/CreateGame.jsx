import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateGameService, GetAllCategories } from "../../Services/CreateGameServ.jsx";

export const CreateGame = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        designer: "",
        year_released: "",
        number_of_players: "",
        estimated_time_to_play: "",
        age_recommendation: "",
        categories: []
    });

    useEffect(() => {
        GetAllCategories().then(setCategories);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(categoryId)
                ? prev.categories.filter(id => id !== categoryId)
                : [...prev.categories, categoryId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await CreateGameService(formData);
            navigate("/games");
        } catch (error) {
            console.error("Error creating game:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Game</h1>
                    <p className="text-lg text-gray-600">Share your favorite board game with the community</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-gray-900 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">Game Information</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title and Designer Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Game Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Enter game title"
                                />
                            </div>

                            <div>
                                <label htmlFor="designer" className="block text-sm font-medium text-gray-700 mb-2">
                                    Designer *
                                </label>
                                <input
                                    type="text"
                                    id="designer"
                                    name="designer"
                                    required
                                    value={formData.designer}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Enter designer name"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                placeholder="Describe the game, its mechanics, and what makes it fun..."
                            />
                        </div>

                        {/* Game Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="year_released" className="block text-sm font-medium text-gray-700 mb-2">
                                    Year Released *
                                </label>
                                <input
                                    type="number"
                                    id="year_released"
                                    name="year_released"
                                    required
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    value={formData.year_released}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="2020"
                                />
                            </div>

                            <div>
                                <label htmlFor="number_of_players" className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Players *
                                </label>
                                <input
                                    type="number"
                                    id="number_of_players"
                                    name="number_of_players"
                                    required
                                    min="1"
                                    max="20"
                                    value={formData.number_of_players}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="2-4"
                                />
                            </div>

                            <div>
                                <label htmlFor="age_recommendation" className="block text-sm font-medium text-gray-700 mb-2">
                                    Age Recommendation *
                                </label>
                                <input
                                    type="number"
                                    id="age_recommendation"
                                    name="age_recommendation"
                                    required
                                    min="3"
                                    max="18"
                                    value={formData.age_recommendation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="12"
                                />
                            </div>
                        </div>

                        {/* Play Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="estimated_time_to_play" className="block text-sm font-medium text-gray-700 mb-2">
                                    Estimated Play Time (minutes) *
                                </label>
                                <input
                                    type="number"
                                    id="estimated_time_to_play"
                                    name="estimated_time_to_play"
                                    required
                                    min="5"
                                    max="600"
                                    step="0.01"
                                    value={formData.estimated_time_to_play}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="60"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                Game Categories
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {categories.map(category => (
                                    <label
                                        key={category.id}
                                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                            formData.categories.includes(category.id)
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.categories.includes(category.id)}
                                            onChange={() => handleCategoryChange(category.id)}
                                            className="sr-only"
                                        />
                                        <span className="text-sm font-medium">{category.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-medium transition-colors ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                                } text-white`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Game...
                                    </span>
                                ) : (
                                    'Create Game'
                                )}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => navigate("/games")}
                                className="flex-1 sm:flex-none px-8 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};