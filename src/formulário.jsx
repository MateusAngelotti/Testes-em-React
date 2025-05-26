import { useState } from "react";

function FormulárioResponsivo(){
    const[nome,setNome] = useState('');
    const[email,setEmail] = useState('');
    const[mensagem,setMensagem] = useState('');
    const[erro,setErro] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se o nome é só números
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
     if (!nomeRegex.test(nome)) {
      setErro('Por favor, insira um nome válido (apenas letras e espaços).');
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro('Email inválido.');
      return;
    }

    setErro('');
    alert('Formulário válido!');
  };



    return(
        <div>
        <h2>Formulário de Contato</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div>
          <label>Mensagem:</label><br />
          <textarea 
            value={mensagem} 
            onChange={(e) => setMensagem(e.target.value)} 
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      <hr />

      <h3>Pré-visualização:</h3>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Mensagem:</strong> {mensagem}</p>
    </div>

    )
}

export default FormulárioResponsivo;