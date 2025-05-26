import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[isLogin,setIsLogin] = useState(false);
    const navigate = useNavigate();

    let handleLogar=(e)=>{
        e.preventDefault();

        if(username === 'admin' && password === '123'){
            setIsLogin(true)
        }else{
            alert('Usuário ou Senha incorretos');
        }
    };

    useEffect(()=>{
        if(isLogin){
            const timer = setTimeout(() => {
            navigate('/dashboard')
            },2000);
            return()=> clearTimeout(timer);
        }
        
    },[isLogin,navigate])

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogar}>
                <input
                type="text"
                placeholder="usuário(admin)"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                /><br/>
                <input
                type="text"
                placeholder="senha(123)"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                /><br />
                <button type="submit">Entrar</button>

            </form>
        </div>
    )

}

export default Login;