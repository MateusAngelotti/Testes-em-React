import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const API_KEY = '506fadb0256c13349acc05dabebf9604';
const BASE_URL = 'https://api.themoviedb.org/3';

Modal.setAppElement('#root');

export default function FilmeAPP(){
    const[movies,setMovies] = useState([]);
    const[query,setQuery] = useState('');
    const[page,setPage] = useState(1);
    const[selectedMovie, setSelectedMovie] = useState(null);
    const[modalIsOpen,setModalIsOpen] = useState(false);

    const fetchMovies = async() =>{
        const endpoint = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${page}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`;

      const res = await axios.get(endpoint);
      setMovies(res.data.results);
    }

    const fetchMovieDetails = async(id) => {
        const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
        setSelectedMovie(res.data);
        setModalIsOpen(true);
    }

    useEffect(()=>{
    fetchMovies();
    },[page,query]);

    return(
        <div style={{ padding: '32px', fontFamily: 'sans-serif' }}>
            <h1>Catálogo de Filmes</h1>

            {/*Pesquisa*/}
            <input type="text"
            placeholder='Vamos achar um filme...'
            value={query}
            onChange={(e)=>{
                setQuery(e.target.value);
                setPage(1)
            }}
            style={{ padding: '8px', width: '300px', margin: '16px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                
                {movies.map((movie)=>(
                    <div key={movie.id}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={()=> fetchMovieDetails(movie.id)}
                    >

                    <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '100%', borderRadius: '8px' }}/>
                    <h3>{movie.title}</h3>
                    <p>{movie.vote_average}</p>                    
                    </div>
                ))}
            </div>

            {/* Paginação */}
             <div style={{ marginTop: '32px' }}>
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                ← Anterior
                </button>
                <span style={{ margin: '0 10px' }}>Página {page}</span>
                <button onClick={() => setPage((p) => p + 1)}>Próxima →</button>
            </div>

            {/* Modal */}

            {selectedMovie && (
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={{
                content: {
                    maxWidth: '600px', margin: 'auto', borderRadius: '12px', padding: '32px'
                }
            }}>
            <h2>{selectedMovie.title}</h2>
            <p><strong>Lançamento:</strong>{selectedMovie.release_date}</p>
            <p><strong>Gêneros:</strong>{selectedMovie.genres?.map(g => g.name).join(', ')}</p>
            <p><strong>Sinopse:</strong>{selectedMovie.overview}</p>
            <button onClick={() => setModalIsOpen(false)} style={{ marginTop: '16px' }}>Fechar</button>
            </Modal>
            )}

        </div>
    )
}