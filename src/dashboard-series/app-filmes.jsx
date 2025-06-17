import { useState, useEffect } from 'react';
import TitleList from './components/ListaFilmes';
import WatchTimeChart from './components/Watchtime';

const AppFilmes = () => {
    const [selected, setSelected] = useState(null);

    const [watched, setWatched] = useState(() => {
        const saved = localStorage.getItem('watched');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify(watched));
    }, [watched]);

const handleAddWatched = (movie) => {
    const exists = watched.find((m) => m.id === movie.id);
    if (!exists) {
        const novoItem = {
            ...movie,
            data: new Date().toISOString().slice(0, 7), // "YYYY-MM"
            horas: 2, // pode ser fixo ou permitir o usuário definir
        };
        setWatched([...watched, novoItem]);
    }
};

    const handleRemoveWatched = (id) => {
        setWatched(watched.filter((m) => m.id !== id));
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard de Séries e Filmes</h1>

            {/* Gráfico */}
            <WatchTimeChart historicoAssistidos={watched} />

            {/* Lista de títulos */}
            <TitleList 
                onSelect={setSelected} 
                onAddWatched={handleAddWatched} 
            />

            {/* Lista de Assistidos */}
            <div>
                <h2>Assistidos</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                    {watched.map((t) => (
                        <div 
                            key={t.id} 
                            style={{ 
                                border: '1px solid gray', 
                                padding: 10, 
                                borderRadius: 8 
                            }}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${t.poster_path}`}
                                alt={t.title}
                                style={{ width: 100 }}
                            />
                            <h4>{t.title}</h4>
                            <button onClick={() => handleRemoveWatched(t.id)}>Remover</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selected && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => setSelected(null)}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: 20,
                            borderRadius: 10,
                            width: 400,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{selected.title}</h2>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${selected.poster_path}`}
                            alt={selected.title}
                            style={{ width: '100%' }}
                        />
                        <p>{selected.overview}</p>
                        <button onClick={() => setSelected(null)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppFilmes;