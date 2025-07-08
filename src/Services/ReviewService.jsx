// Service for creating a review
export const CreateReview = (reviewData) => {
    console.log("Creating review with data:", reviewData);
    
    return fetch(`http://localhost:8000/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        },
        body: JSON.stringify(reviewData)
    })
    .then(res => {
        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);
        
        if (!res.ok) {
            return res.text().then(text => {
                console.error("Error response:", text);
                throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
            });
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error creating review:", error);
        throw error;
    });
};

// Service for fetching reviews for a specific game
export const GetGameReviews = (gameId) => {
    return fetch(`http://localhost:8000/reviews?game_id=${gameId}`, {
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
        console.error("Error fetching reviews:", error);
        throw error;
    });
};

// Service for updating a review
export const UpdateReview = (reviewId, reviewData) => {
    return fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        },
        body: JSON.stringify(reviewData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.status === 204 ? null : res.json();
    })
    .catch(error => {
        console.error("Error updating review:", error);
        throw error;
    });
};

// Service for deleting a review
export const DeleteReview = (reviewId) => {
    return fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gamer_token")}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.status === 204 ? null : res.json();
    })
    .catch(error => {
        console.error("Error deleting review:", error);
        throw error;
    });
};
