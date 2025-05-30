import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const irParaSupermercado = () => {
    navigate('/supermercado');
  };

  const irParaPokedex =()=>{
    navigate('/pokedex');
  }

  const irParaCalculadora =()=>{
    navigate('/calculadora');
  }

  const irParaTemperatura = () =>{
    navigate('/temperatura');
  }

    const irParaIMC = () =>{
    navigate('/imc');
  }

    const irParaContador = () =>{
    navigate('/contador');
  }

    const irParaVelha = () =>{
    navigate('/velha');
  }

    const irParaLista = () =>{
    navigate('/to-do');
  }

    const irParaChecklist = () =>{
    navigate('/viajem');
  }

    const irParaGeradorNum = () =>{
    navigate('/gerador-num');
  }
  
    const irParaFormulario = () =>{
    navigate('/formulario');
  }

    const irParaCadastro = () =>{
    navigate('/cadastro');
  }

    const irParaBlog = () =>{
    navigate('/blog');
  }

  const irParaUsuarios =()=>{
    navigate('/usuarios')
  }



  return(
    <div>
      <h1>Bem-vindo ao Painel</h1>
      <br/>
      <br/>
      <button onClick={irParaSupermercado}>Ir para Supermercado</button>
      <br/>
      <br/>
      <button onClick={irParaPokedex}>Ir para Pokedex</button>
      <br/>
      <br/>
      <button onClick={irParaCalculadora}>Ir para Calculadora</button>
      <br/>
      <br/>
      <button onClick={irParaTemperatura}>Ir para o Conversor de Temperatura</button>
      <br/>
      <br/>
      <button onClick={irParaIMC}>Ir para Calculo de IMC</button>
      <br/>
      <br/>
      <button onClick={irParaContador}>Ir para Contador</button>
      <br/>
      <br/>
      <button onClick={irParaVelha}>Ir para Jogo da Velha</button>
      <br/>
      <br/>
      <button onClick={irParaLista}>Ir para To-do-List</button>
      <br/>
      <br/>
      <button onClick={irParaChecklist}>Ir para Checklist de Viajem</button>
      <br/>
      <br/>
      <button onClick={irParaGeradorNum}>Ir para Gerador Numérico</button>
      <br/>
      <br/>
      <button onClick={irParaFormulario}>Ir para Formulário Responsivo</button>
      <br/>
      <br/>
      <button onClick={irParaCadastro}>Ir para Cadastrar</button>
      <br/>
      <br/>
      <button onClick={irParaBlog}>Ir para o Blog</button>
      <br/>
      <br/>
      <button onClick={irParaUsuarios}>Ir pra User Api</button>
    </div>
    
  ) 
}