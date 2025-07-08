export const GetAllGames = () => {
    const token = localStorage.getItem("gamer_token");
    console.log("Current token:", token);
    
    return fetch(`http://localhost:8000/games`, {
       headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
    })
    .then(res => {
        console.log("Response status:", res.status);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error fetching games:", error);
        throw error;
    });
};


