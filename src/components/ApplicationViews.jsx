import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../views/Login"
import { Register } from "../views/Register"
import { Home } from "../views/Home.jsx"
import { AllGames } from "./Games/AllGames.jsx"
import { CreateGame } from "./Games/CreateGame.jsx"
import { MyGames } from "./Games/MyGames.jsx"
import { GameDetails } from "./Games/GameDetails.jsx"
import { EditGame } from "./Games/EditGame.jsx"
import { ReviewForm } from "./Reviews/ReviewForm.jsx"

export const ApplicationViews = () => {
   
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<AllGames />} />
                <Route path="/games/:id" element={<GameDetails />} />
                <Route path="/games/:id/edit" element={<EditGame />} />
                <Route path="/games/:gameId/review" element={<ReviewForm />} />
                <Route path="/creategame" element={<CreateGame />} />
                <Route path="/mygames" element={<MyGames />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
