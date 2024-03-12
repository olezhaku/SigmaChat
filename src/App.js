import React from "react";
import "./style/App.css";
import Messager from "./pages/Messager/Messager";
import Feedback from "./pages/Feedback/Feedback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/UI/Navbar/MyNavbar";
import Login from "./pages/Login/Login";
import { Navigate } from "react-router-dom";
import Error from "./pages/Error/Error";
import Register from "./pages/Register/Register";

function App() {
    return (
        <BrowserRouter>
            <section>
                <Navbar />
                <Routes>
                    <Route path="/feedback" element={<Feedback />} />
                    {/* <Route
                        path="/posts"
                        element={posts.map((post) => (
                            <Posts key={post.description} {...post} />
                        ))}
                    /> */}
                    <Route path="/messager" element={<Messager />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/error" />} />
                    <Route path="/error" element={<Error />} />
                </Routes>
            </section>
        </BrowserRouter>
    );
}

export default App;
