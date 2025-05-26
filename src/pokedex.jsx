import React, { useEffect, useState } from 'react';
import './pokedex.css'

function PokemonBox({numero,imagem,nome,tipo}){
    return (
    <div className="pokemon-box">
      <p style={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}>{numero}</p>
      <img src={imagem} alt={nome} />
      <p style={{ fontWeight: 'bold' }}>{nome}</p>
      <p style={{ border: '1px solid black', backgroundColor: 'gray', color: 'white', marginRight: '5px' }}>{tipo}</p>
    </div>
  );
}

function Pokedex(){
    const [geracao, setGeracao] = useState('1');
    const[pokemon,setPokemon] = useState([])

    useEffect(()=>{
        async function carregarPokemonsPorGeracao() {
            setPokemon([]); // limpa anterior
            const response = await fetch(`https://pokeapi.co/api/v2/generation/${geracao}`);
            const data = await response.json();

            const nomes = data.pokemon_species.map((p) => p.name);

        const detalhes = await Promise.all(
                nomes.map(async (nome) => {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
                    const detalhes = await res.json();
                    const tipo = detalhes.types.map((t) => t.type.name).join('/');
                    return {
                    nome: detalhes.name,
                    imagem: detalhes.sprites.front_default,
                    numero: detalhes.id,
                    tipo,
                    };
                } catch (err) {
                    console.error('Erro com Pokémon:', nome);
                    return null;
                }
                })
            );

            const filtrados = detalhes.filter(Boolean).sort((a, b) => a.numero - b.numero);
            setPokemon(filtrados);
            }

            carregarPokemonsPorGeracao();
        }, [geracao]);


        return (
    <div className="main">
      <h2>Pokedex</h2>

      <select value={geracao} onChange={(e) => setGeracao(e.target.value)} style={{ width: '100%', height: '40px', marginBottom: '10px' }}>
        <option value="1">Geração 1 (1-151)</option>
        <option value="2">Geração 2 (152-251)</option>
        <option value="3">Geração 3 (252-386)</option>
        <option value="4">Geração 4 (387-493)</option>
        <option value="5">Geração 5 (494-649)</option>
        <option value="6">Geração 6 (650-721)</option>
        <option value="7">Geração 7 (722-809)</option>
        <option value="8">Geração 8 (810-898)</option>
        <option value="9">Geração 9 (899+)</option>
      </select>

      <div className="pokemon-boxes">
        {pokemon.map((poke) => (
          <PokemonBox key={poke.numero} {...poke} />
        ))}
      </div>
    </div>
  );
}
export default Pokedex;