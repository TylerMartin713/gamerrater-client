// Service for fetching games created by the current user
export const GetMyGames = () => {
    return fetch(`http://localhost:8000/games?my_games=true`, {
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
        console.error("Error fetching my games:", error);
        throw error;
    });
};
