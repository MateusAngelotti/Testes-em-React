import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useState,useEffect } from "react";
import CommentSection from './CommentSection'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function PostDetail({isAdmin, setIsAdmin }){
    const{id} = useParams();
    const[postagem,setPostagem] = useState(null);
    const navigate = useNavigate();
   
    
    useEffect(()=>{
        const savedPosts = localStorage.getItem("posts");
        if(savedPosts){
            const parsedPosts = JSON.parse(savedPosts);
            const found = parsedPosts.find((p)=>p.id === parseInt(id));
            setPostagem(found);
        }
    },[id])

   

    if(!postagem) return <p>Post não encontrado</p>;

 return(

        
        <div className="post-detail-container">
        {isAdmin && (
            <button
                onClick={() => navigate("/admin")}
                className="go-to-admin-button"
            >
                Ir para administração
            </button>
            )}

            <Link to="/"
            className="post-home-link"
            onClick={() => {
                setIsAdmin(false);
                localStorage.setItem("isAdmin", false);
            }}>
                Home
            </Link>
            <h1 className="post-title">{postagem.title}</h1>
            <div className="post-content">
                <ReactMarkdown>{postagem.content}</ReactMarkdown>
            </div>
            <CommentSection postId = {postagem.id} isAdmin={isAdmin}/>
        </div>

        
    )
}

export default PostDetail;