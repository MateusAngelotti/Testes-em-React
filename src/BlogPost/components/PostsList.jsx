import { Link } from "react-router-dom";
import { posts as initialPosts } from "../data/posts";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function PostList({ isAdmin = false, setIsAdmin }) {
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem("posts");
        return saved ? JSON.parse(saved) : initialPosts;
    });

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

    const handleAdicionar = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const newPost = {
            id: Date.now(),
            title,
            content,
        };

        setPosts([...posts, newPost]);
        setTitle("");
        setContent("");
    };

    const handleDeletar = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
        localStorage.removeItem(`comments-${id}`);
    };


return (
     <div className="admin-page-wrapper">
        <div className="post-list-container">
            {isAdmin && (
                <div className="post-header">
                    <div className="admin-container">
                    <div className="admin-wrapper">
                        <h1>Área de Administração</h1>
                        <p>Gerencie seus posts, comentários e configurações.</p>
                    </div>
                    </div>
                    <Link to="/" className="post-home-link"
                     onClick={() => {
                    setIsAdmin(false);
                    localStorage.setItem("isAdmin", false);
                    }}>Home</Link>
                </div>
            )}

            {/* 👉 O formulário deve estar fora do `isAdmin && (...)`, mas dentro de uma verificação */}
            {isAdmin ? (
                <form onSubmit={handleAdicionar} className="post-form">
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="post-input"
                    />
                    <textarea
                        placeholder="Conteúdo (markdown)"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="post-textarea"
                    />
                    <button type="submit" className="post-button">Adicionar Post</button>
                </form>
            ) : null}

            <hr />

            {posts.length === 0 && <p className="nenhum-post">Nenhum post disponível.</p>}

            <div className="post-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <h2>{post.title}</h2>
                        <Link to={`/post/${post.id}`} className="read-more">Ler mais</Link>
                        {isAdmin && (
                            <button onClick={() => handleDeletar(post.id)} className="delete-button">
                                Deletar Post
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default PostList;