// Service for creating a new game
export const CreateGameService = (gameData) => {
    return fetch(`http://localhost:8000/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        },
        body: JSON.stringify(gameData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error creating game:", error);
        throw error;
    });
};

// Service for fetching all categories
export const GetAllCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error fetching categories:", error);
        throw error;
    });
};
