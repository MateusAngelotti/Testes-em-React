import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "./PostsList";

function LoginPage({ setIsAdmin }) {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "123") {
            setIsAdmin(true);
            navigate("/admin");
        } else {
            alert("Senha incorreta");
        }
    };

       return (
        <div className="login-page-wrapper">
            <h1 className="public-title">Blog Público</h1>
            <div className="login-page-flex">
                <div className="login-box">
                    <h2>Entrar</h2>
                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="password"
                            placeholder="Digite a senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                        <button type="submit" className="login-button">Entrar</button>
                    </form>
                </div>

                {/* Aqui renderiza o PostList com o título já incluso */}
                <PostList isAdmin={false} />
            </div>
        </div>
    );
}

export default LoginPage;