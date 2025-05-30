import { useState,useEffect } from "react";


function CommentSection({postId,isAdmin}){
    const[comments,setComments] = useState(()=>{
        const saved = localStorage.getItem(`comments-${postId}`);
        return saved? JSON.parse(saved) : [];
    });

    const[newComment,setNewComment] = useState("");
    const [username, setUsername] = useState("");

    


    useEffect(()=>{
        localStorage.setItem(`comments-${postId}`,JSON.stringify(comments));
    },[comments,postId]);

    const handleSubmit = e =>{
        e.preventDefault();
        if(!username.trim() || !newComment.trim()) return;
        const newEntry = {
            name: username.trim(),
            text: newComment.trim(),
            };
        
        setComments([...comments, newEntry]);
        setNewComment("");
        
    };

     const handleDelete = (index) => {
        const updated = [...comments];
        updated.splice(index, 1); // Remove pelo índice
        setComments(updated);
    };

    return(
        <div className="comment-section">
            <h3>Comentários</h3>

            <form onSubmit={handleSubmit} className="comment-form">
                <input
                className="comment-input"
                type="text"
                placeholder="Seu nome"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />

                <textarea
                className="comment-textarea"
                value={newComment}
                onChange={e=>setNewComment(e.target.value)}
                placeholder="Digite seu comentário"/>
                <button type="submit" className="comment-button">Postar</button>
            </form>
                    <ul className="comment-list">
                {comments.map((c, i) => (
                <li key={i}>
                    <strong>{c.name}:</strong> {c.text}
                     {isAdmin && (
                                <button
                                    className="delete-comment-button"
                                    onClick={() => handleDelete(i)}
                                >
                                    Excluir
                                </button>
                            )}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default CommentSection;



