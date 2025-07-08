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
