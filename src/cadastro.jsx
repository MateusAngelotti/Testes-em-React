import React,{ useState } from "react";

function Cadastrar(){

    const [username,setUsername] = useState('');
    const [nome,setNome] = useState('');
    const [idade,setIdade] = useState('');
    const [erro,setErro] = useState('')
    const [usuarios, setUsuarios] = useState([]);

    let handleCadastrar=()=>{
        const user = username.trim();
        const idadeTexto = idade.trim();
        const nomecad = nome.trim();

        if (!user || !nomecad || idadeTexto  === "") {
            setErro('Preencha todos os campos!');
            return;
        }
        const nomeJaExiste = usuarios.some(
        user => user.username.toLowerCase() === username.toLowerCase()
        );
        if (nomeJaExiste) {
            setErro('Este nome de usuário já está cadastrado.');
            return;
        }

        const idadeNum = Number(idadeTexto);


        if(isNaN(idadeNum)){
            setErro('Idade precisa ser um valor numérico');
            return;
        }
        
        if (!Number.isInteger(idadeNum)) {
            setErro('Idade não pode conter casas decimais');
            return;
        }


        if(idadeNum < 0){
            setErro('Idade não pode ser negativa')
            return;
        }
        let novoUsuario = {
            username : username,
            nome: nome,
            idade : idadeNum,
        }
        setUsuarios([...usuarios,novoUsuario]);

        setUsername('');
        setIdade('');
        setErro('');
        setNome('')


    };
    return(
        <div>
            <h2>Cadastro de Usuários</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
            />
            <button onClick={handleCadastrar}>Cadastrar</button>

            <h3>Usuários Registrados</h3>
            <ul>
                {usuarios.map((user, index) => (
                    <li key={index}>
                        {user.username} - {user.nome} - {user.idade} anos
                    </li>
                ))}
            </ul>
        </div>
    )


}

export default Cadastrar;