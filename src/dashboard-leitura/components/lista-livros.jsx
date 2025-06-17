import {useState} from 'react';
import initialBooks from '../data/livros';
import LeituraCharts from './progresso-grafico';

export default function LivrosList(){
    const [books, setBooks] = useState(initialBooks);
    const[selectedBook, setSelectedBook] = useState(null);
    const [filter,setFilter] = useState('todos');
    const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    summary: '',
    status: 'quero ler',
    rating: null,
  });

    
    const filteredBooks = filter === 'todos'
    ? books
    : books.filter(book => book.status === filter);

    const handleAddBook = (e) =>{
        e.preventDefault();
        const id = books.length ? books[books.length - 1].id + 1 : 1;
        setBooks([...books, { ...newBook, id }]);
        setNewBook({
        title: '',
        author: '',
        summary: '',
        status: 'quero ler',
        rating: null,
        });
    };

    const updateStatus = (id, newStatus) => {
    const updated = books.map(book =>
      book.id === id ? { ...book, status: newStatus } : book
    );
    setBooks(updated);
    setSelectedBook({ ...selectedBook, status: newStatus });
  };

  const updateRating = (id, newRating) => {
      const updated = books.map(book =>
        book.id === id ? { ...book, rating: newRating } : book
     );
    setBooks(updated);
    setSelectedBook({ ...selectedBook, rating: newRating });
    };

    const deleteBook = (id) => {
    const updated = books.filter(book => book.id !== id);
    setBooks(updated);
    setSelectedBook(null);
    };

  return (
    <div>
      <h2>Minha Lista de Livros</h2>
      <LeituraCharts books={books} />

      {/* Filtros */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setFilter('todos')}>Todos</button>
        <button onClick={() => setFilter('lendo')}>Lendo</button>
        <button onClick={() => setFilter('concluído')}>Concluído</button>
        <button onClick={() => setFilter('quero ler')}>Quero Ler</button>
      </div>

      {/* Lista de livros */}
      {filteredBooks.map(book => (
        <div
          key={book.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedBook(book)}
        >
          <h3>{book.title}</h3>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Status:</strong> {book.status}</p>
        </div>
      ))}

      {/* Modal */}
      {selectedBook && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '16px',
              borderRadius: '8px',
              width: '400px',
              maxHeight: '80%',
              overflowY: 'auto'
            }}
          >
            <h2>{selectedBook.title}</h2>
            <p><strong>Autor:</strong> {selectedBook.author}</p>
            <p><strong>Status:</strong> {selectedBook.status}</p>
            <p><strong>Resumo:</strong> {selectedBook.summary}</p>
            <p><strong>Nota:</strong> {selectedBook.rating ? `${selectedBook.rating}/5` : 'Ainda não avaliado'}</p>

            {/* Alterar status */}
            <div>
              <label>Alterar Status: </label>
              <select
                value={selectedBook.status}
                onChange={(e) => updateStatus(selectedBook.id, e.target.value)}
              >
                <option value="lendo">Lendo</option>
                <option value="concluído">Concluído</option>
                <option value="quero ler">Quero Ler</option>
              </select>
            </div>

            <div>
                <label>Alterar Nota: </label><br />
                <select
                    value={selectedBook.rating || ''}
                    onChange={(e) => updateRating(selectedBook.id, parseInt(e.target.value))}
                >
                    <option value="">Sem nota</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                    ))}
                </select>
                </div>

                <button
                onClick={() => deleteBook(selectedBook.id)}
                style={{
                    marginTop: '10px',
                    background: '#d9534f',
                    color: 'white',
                    padding: '8px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
                >
                Excluir Livro
                </button>

            <button onClick={() => setSelectedBook(null)} style={{ marginTop: '10px' }}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Formulário de novo livro */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginTop: '16px'
      }}>
        <h3>Adicionar Novo Livro</h3>
        <form onSubmit={handleAddBook}>
          <div>
            <label>Título:</label><br />
            <input
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Autor:</label><br />
            <input
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Resumo:</label><br />
            <textarea
              value={newBook.summary}
              onChange={(e) => setNewBook({ ...newBook, summary: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Status:</label><br />
            <select
              value={newBook.status}
              onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
            >
              <option value="quero ler">Quero Ler</option>
              <option value="lendo">Lendo</option>
              <option value="concluído">Concluído</option>
            </select>
            <div>
            <label>Nota (1 a 5):</label><br />
            <select
                value={newBook.rating || ''}
                onChange={(e) =>
                setNewBook({ ...newBook, rating: parseInt(e.target.value) })
                }
                required
            >
                <option value="">Selecione uma nota</option>
                {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
                ))}
            </select>
            </div>
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Adicionar Livro</button>
        </form>
      </div>
    </div>
  );
}