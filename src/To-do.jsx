import React,{useState} from "react";

function Lista(){
    const[tarefa, setTarefa] = useState('');
    const [tarefasList, setTarefasList] = useState([
        "Acordar",
        "Tomar café da manhã",
        "Almoçar",
        "Programar",
        "Dormir"
    ])
    const [filtro, setFiltro] = useState('todas');
    const [tarefasConcluidas, setTarefasConcluidas] = useState([]);

    let adicionarTarefa = (e) => {
      e.preventDefault();
      if (tarefa.trim() === '') return;
      setTarefasList([...tarefasList, tarefa]);
      setTarefa('');
    };

    let concluirTarefa = (index) => {
        const tarefa = tarefasList[index];
        setTarefasConcluidas([...tarefasConcluidas, tarefa]); 
        const novasTarefas = tarefasList.filter((_, i) => i !== index); 
        setTarefasList(novasTarefas);
      };


    let deletarTarefa = (index) => {
      const novasTarefas = tarefasList.filter((_, i) => i !== index);
      setTarefasList(novasTarefas);
    };


  return (
    <div className="tarefas">
      <form onSubmit={adicionarTarefa}>
        <input 
          type="text" 
          value={tarefa} 
          onChange={(e) => setTarefa(e.target.value)} 
        />
        <input type="submit" value="Inserir" />
      </form>
      
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={() => setFiltro('todas')}
          style={{ fontWeight: filtro === 'todas' ? 'bold' : 'normal' }}
        >Todas</button>
        <button 
          onClick={() => setFiltro('pendentes')}
          style={{ fontWeight: filtro === 'pendentes' ? 'bold' : 'normal' }}
        >Pendentes</button>
        <button 
          onClick={() => setFiltro('concluidas')}
          style={{ fontWeight: filtro === 'concluidas' ? 'bold' : 'normal' }}
        >Concluídas</button>
      </div>

      
      {(filtro === 'todas' || filtro === 'pendentes') && (
        <>
          <h3>Tarefas Pendentes:</h3>
          {tarefasList.length > 0 ? (
            tarefasList.map((item, index) => (
              <p key={index}>
                {item} | 
                <button onClick={() => concluirTarefa(index)}>OK</button>
                <button onClick={() => deletarTarefa(index)}>X</button>
              </p>
            ))
          ) : (
            <p>Nenhuma tarefa pendente.</p>
          )}
        </>
      )}

        
        {(filtro === 'todas' || filtro === 'concluidas') && (
          <>
            <h3>Tarefas Concluídas:</h3>
            {tarefasConcluidas.length > 0 ? (
              tarefasConcluidas.map((item, index) => (
                <p key={index} style={{ fontWeight: "bold", color: "green" }}>
                  {item}
                  <button onClick={() => deletarTarefa(index)}>X</button>
                </p>
              ))
            ) : (
              <p>Nenhuma tarefa concluída.</p>
            )}
          </>
        )}
      </div>
    );
  }



export default Lista;

