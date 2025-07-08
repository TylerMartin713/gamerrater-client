export const GetGameById = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        },
    }).then(res => res.json())
};