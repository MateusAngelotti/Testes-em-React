import { useState,useEffect } from "react";

function UsuarioApi(){
    const[usuarios,setUsuarios] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);

    async function loadUsers() {
        try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!res.ok) throw new Error('Erro na requisição');
        const data = await res.json();
        setUsuarios(data);
        }catch(err){
            setError(err.message);
        } finally {
            setLoading(false);
        }        
    }

    
    useEffect(() => {
        loadUsers();
    }, []);

    if(loading) return<p>Carregando usuários...</p>
    if(error) return<p>Erro:{error}</p>

      return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email} — {user.address.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioApi;