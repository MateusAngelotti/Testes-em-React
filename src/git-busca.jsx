import React, { useState, useEffect } from "react";

const BuscaGit=()=>{
    const[query,setQuery] = useState("");
    const[results,setResults] = useState([]);
    const[username,setUsername] = useState("");
    const[favoritos,setFavoritos] = useState(()=>{
        return JSON.parse(localStorage.getItem("favoritos")) || []
    });

    const searchRep = async () =>{
        const res = await fetch(`https://api.github.com/search/repositories?q=${query}`);
        const data = await res.json();
        setResults(data.items || []);
    };

    const buscarPorUsuario = async () => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    if (!res.ok) {
      alert("Usuário não encontrado");
      setResults([]);
      return;
    }
    setResults(data || []);
  };

    const toggleFavoritos =(repo)=>{
        const isFav = favoritos.find((fav)=> fav.id === repo.id);
        const newFavs = isFav
        ? favoritos.filter((fav)=>fav.id !== repo.id)
        : [...favoritos,repo];

        setFavoritos(newFavs);
        localStorage.setItem("favorites", JSON.stringify(newFavs));
    }

    const removerFavoritos = (repoId) =>{
        const atualizados = favoritos.filter((fav)=>fav.id !== repoId);
        setFavoritos(atualizados);
        localStorage.setItem("favorites", JSON.stringify(atualizados));
    }

    return(
        <div style={{ padding: 20 }}>
            <h2>Repositórios do Git</h2>
            <input 
            type="text"
            placeholder="Digite o nome de um repositório"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            style={{ width: 300,marginRight: 8 ,marginBottom: "10px" }}
            />
            <button onClick={searchRep}>Buscar</button>


            <div>
                <input
                type="text"
                placeholder="Busca nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: 300, marginRight: 8 }}
                />
                <button onClick={buscarPorUsuario}>Buscar Usuário</button>
            </div>

            <h3>Resultados</h3>
            <br/>
            <ul>
                {results.map((repo)=>(
                    <li key={repo.id} style={{ marginBottom: "8px" }}>
                        <strong>{repo.full_name}</strong> ⭐ {repo.stargazers_count}
                        <br />
                        {repo.description}
                        <br />
                        <button onClick={()=>toggleFavoritos(repo)}>
                            {favoritos.some((fav)=>fav.id === repo.id)
                            ? "Remover Favorito"
                            :"Adicionar Favorito"}
                        </button>
                    </li>
                    
                ))}
            </ul>
            <br />
            <br />
            <br />

            <h3 style={{ marginBottom: "1.5rem" }}>Favoritos</h3>
            <ul>
                {favoritos.map((repo)=>(
                    <li key={repo.id} style={{ marginBottom: "8px" }}>{repo.full_name}
                    <button onClick={() => removerFavoritos(repo.id)}>Remover</button></li>
                ))}
            </ul>
        </div>
    )
}

export default BuscaGit;