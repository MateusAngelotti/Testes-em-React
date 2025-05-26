import { useState } from "react";

function  Checklist() {
    const [items,setItems]= useState([])
    const [novoItem, setNovoItem] = useState("")

    let marcarItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, marcado: !item.marcado } : item
      )
    );
  };

  let adicionarItem = () =>{
    if (novoItem.trim() === "") return;
    const novo = {
      id: Date.now(),
      nome: novoItem,
      marcado: false
    };
    setItems([...items,novo]);
    setNovoItem("")
  }

    const deletarItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    };


  
    return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Checklist de Viagem</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Adicionar item..."
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          style={{ padding: "8px", width: "70%" }}
        />
        <button onClick={adicionarItem} style={{ padding: "8px 12px", marginLeft: "8px" }}>
          Adicionar
        </button>
      </div>

    <ul style={{ listStyle: "none", padding: 0 }}>
    {items.map((item) => (
        <li key={item.id} style={{ textDecoration: item.marcado ? "line-through" : "none" }}>
        {item.nome} | 
        <button onClick={() => marcarItem(item.id)}>OK</button>
        <button onClick={() => deletarItem(item.id)}>X</button>
        </li>
    ))}
    </ul>
    </div>
  );
}

export default Checklist