import { useState, useEffect } from "react";

export default function ZeldaNotes() {
  const [category, setCategory] = useState("monsters");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const[searchTerm,setSearchTerm] = useState("");
  const[game,setGame] = useState("totk");

  const categories = ["monsters", "equipment", "materials", "creatures", "treasure"];

  useEffect(() => {
    fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}?game=${game}`)
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data.data) ? data.data : []);
      })
      .catch(err => {
        console.error("Erro ao buscar dados da API:", err);
        setItems([]);
      });
  }, [category,game]);

    let filteredItems = items.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>📚 Catálogo Zelda - {category.toUpperCase()}</h1>

      {/* Botões de Categoria */}
      <div style={{ marginBottom: 20 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: 10,
              padding: "10px 15px",
              backgroundColor: category === cat ? "#333" : "#ccc",
              color: category === cat ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Botão de troca de jogo */}
      <div style={{ marginBottom: 20 }}>
        <button
        onClick={() => setGame(game === "totk" ? "botw" : "totk")}
        style={{
            padding: "10px 15px",
            backgroundColor: "#0066cc",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
          > Trocar para {game === "totk" ? "BOTW" : "TOTK"}</button>
      </div>

      {/* Campo de busca */}
      <input
      type="text"
      placeholder="busque um nome"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      style={{
          padding: 10,
          width: "100%",
          maxWidth: 300,
          marginBottom: 20,
          borderRadius: 4,
          border: "1px solid #ccc"
        }}/>
        
        {/* Lista de Itens */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredItems.map(item => (
            <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            style={{
                border: "1px solid #ddd",
                padding: 10,
                margin: 10,
                width: 150,
                cursor: "pointer",
                textAlign: "center",
            }}
            >
            <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: 100, objectFit: "cover" }}
            />
            <p>{item.name}</p>
            </div>
        ))}
        </div>
      {/* Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 400,
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 25,
                height: 25,
                cursor: "pointer",
              }}
            >
              X
            </button>

            <h2>{selectedItem.name}</h2>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              style={{ width: "100%", height: "auto" }}
            />
            <p>
              <strong>Descrição:</strong> {selectedItem.description}
            </p>
            <p>
              <strong>Localizações:</strong>{" "}
              {selectedItem.common_locations?.join(", ") || "Desconhecido"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}