// Service for creating a new game
export const CreateGameService = (gameData) => {
    return fetch(`http://localhost:8000/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        },
        body: JSON.stringify(gameData)
    }).then(res => res.json())
};

// Service for fetching all categories
export const GetAllCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        }
    }).then(res => res.json())
};
