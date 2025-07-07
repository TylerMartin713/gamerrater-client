export const GetAllGames = () => {
    return fetch(`http://localhost:8000/games`, {
        headers: {
            "Authorization": "Token 97a15cfc7bb483b16a16fce6547c6b216ee61080"
        }
    }).then(res => res.json())
};

// export const GetGameById = (id) => {
//     return fetch(`http://localhost:8000/games/${id}`)
// };