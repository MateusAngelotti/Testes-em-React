import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PostList from "./components/PostsList";
import PostDetail from "./components/PostDetail";
import LoginPage from "./components/LoginPage";
import { useState,useEffect } from "react";
import './blog.css'
import ProtectedRoute from "./components/ProtectedRoute";

function BlogApp(){
        const [isAdmin, setIsAdmin] = useState(() => {
        // Tenta carregar do localStorage ao iniciar
        const stored = localStorage.getItem("isAdmin");
        return stored === "true"; // retorna true/false
    });

    // Sempre que mudar, atualiza o localStorage
    useEffect(() => {
        localStorage.setItem("isAdmin", isAdmin);
    }, [isAdmin]);
   return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage setIsAdmin={setIsAdmin} />} />
                 <Route 
                        path="/admin" 
                        element={
                        <ProtectedRoute isAdmin={isAdmin}>
                            <PostList isAdmin={true} setIsAdmin={setIsAdmin} />
                        </ProtectedRoute>
                        } 
                    />
                <Route path="/post/:id" element={<PostDetail isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
                
            </Routes>
        </Router>
    );
}

export default BlogApp;