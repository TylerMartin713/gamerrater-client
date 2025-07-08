import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetGameById } from "../../Services/GetGameById.jsx";
import { GetAllCategories } from "../../Services/CreateGameServ.jsx";

export const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
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
        const fetchData = async () => {
            try {
                setLoading(true);
                const [game, categoriesData] = await Promise.all([
                    GetGameById(id),
                    GetAllCategories()
                ]);
                
                setFormData({
                    title: game.title || "",
                    description: game.description || "",
                    designer: game.designer || "",
                    year_released: game.year_released || "",
                    number_of_players: game.number_of_players || "",
                    estimated_time_to_play: game.estimated_time_to_play || "",
                    age_recommendation: game.age_recommendation || "",
                    categories: game.categories ? game.categories.map(cat => cat.id) : []
                });
                
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load game data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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
        setError("");
        
        try {
            const response = await fetch(`http://localhost:8000/games/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("gamer_token")}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate("/mygames");
        } catch (error) {
            console.error("Error updating game:", error);
            setError("Failed to update game. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                        <h3 className="text-xl font-medium text-gray-600">Loading game data...</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate("/mygames")}
                        className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to My Games
                    </button>
                    
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Game</h1>
                        <p className="text-lg text-gray-600">Update your game information</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
                            />
                        </div>

                        {/* Game Details Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                    max="2030"
                                    value={formData.year_released}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="number_of_players" className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Players *
                                </label>
                                <input
                                    type="number"
                                    id="number_of_players"
                                    name="number_of_players"
                                    required
                                    min="1"
                                    value={formData.number_of_players}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="estimated_time_to_play" className="block text-sm font-medium text-gray-700 mb-2">
                                    Play Time (min)
                                </label>
                                <input
                                    type="number"
                                    id="estimated_time_to_play"
                                    name="estimated_time_to_play"
                                    min="1"
                                    value={formData.estimated_time_to_play}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="age_recommendation" className="block text-sm font-medium text-gray-700 mb-2">
                                    Min Age
                                </label>
                                <input
                                    type="number"
                                    id="age_recommendation"
                                    name="age_recommendation"
                                    min="1"
                                    max="18"
                                    value={formData.age_recommendation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        {categories.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Categories
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {categories.map((category) => (
                                        <label
                                            key={category.id}
                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.categories.includes(category.id)}
                                                onChange={() => handleCategoryChange(category.id)}
                                                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/mygames")}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    "Update Game"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
