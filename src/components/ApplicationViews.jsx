import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../views/Login"
import { Register } from "../views/Register"
import { Home } from "../views/Home.jsx"

export const ApplicationViews = () => {
   
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
