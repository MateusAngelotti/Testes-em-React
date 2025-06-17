import { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies } from '../services/tmdb';

const IMG_URL = 'https://image.tmdb.org/t/p/w200';

const TitleList = ({ onSelect, onAddWatched }) => {
    const [titles, setTitles] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadPopular();
    }, []);

    const loadPopular = async () => {
        const data = await fetchPopularMovies();
        setTitles(data);
    };

    const handleSearch = async () => {
        if (search.trim() === '') {
            loadPopular();
        } else {
            const data = await searchMovies(search);
            setTitles(data);
        }
    };

    return (
        <div>
            <h2>Filmes Populares / Buscar</h2>

            <div style={{ marginBottom: 10 }}>
                <input 
                    type="text" 
                    placeholder="Buscar filme ou série..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {titles.map((t) => (
                    <div
                        key={t.id}
                        style={{
                            width: 150,
                            border: '1px solid #ccc',
                            padding: 10,
                            borderRadius: 8,
                            cursor: 'pointer',
                        }}
                        onClick={() => onSelect(t)}
                    >
                        <img 
                            src={`${IMG_URL}${t.poster_path}`} 
                            alt={t.title} 
                            style={{ width: '100%' }} 
                        />
                        <h4>{t.title}</h4>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            onAddWatched(t);
                        }}>
                            Marcar como Assistido
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TitleList;

