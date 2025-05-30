import { useState } from "react";

export default function TestesArray(){
    const[tasks,setTasks] = useState([]);

    let AddTarefa=(text,toStart=false)=>{
        const newTask = {id:Date.now(), text, done: false}
        const updatedTasks = [...tasks]
        toStart ? updatedTasks.unshift(newTask) : updatedTasks.push(newTask);
        setTasks(updatedTasks);
    }

    let removerTarefa =()=>{
        const updatedTasks = [...tasks];
        updatedTasks.shift();
        setTasks(updatedTasks);
    };

    const removeTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    let toggleDone =(id)=>{
        const updated = tasks.map(task=>
            task.id === id ? {...task,done: !task.done} : task
        )
        setTasks(updated);
    };

    const allDone = tasks.every(task => task.done);
    const someDone = tasks.some(task => task.done);
    const doneTasks = tasks.filter(task => task.done);
    const totalDone = tasks.reduce((acc, task) => acc + (task.done ? 1 : 0), 0);


 const iterateTasks = () => {
    for (const task of tasks) {
      console.log(task.text);
    }
  };

  const copyWith = (task, changes) => {
    return { ...task, ...changes };
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Lista de Tarefas</h2>

      <input
        type="text"
        placeholder="Nova tarefa"
        onKeyDown={(e) => {
          if (e.key === "Enter") AddTarefa(e.target.value);
        }}
      />
      <button onClick={() => AddTarefa(prompt("Texto da tarefa"), true)}>Adicionar no início</button>
      <button onClick={removerTarefa}>Remover primeira tarefa</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
            />
            {task.text}
            <button onClick={() => removeTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <hr />

      <p>✅ Concluídas: {totalDone}</p>
      <p>📋 Todas concluídas? {allDone ? "Sim" : "Não"}</p>
      <p>🔍 Alguma concluída? {someDone ? "Sim" : "Não"}</p>
      <button onClick={iterateTasks}>🌀 Iterar tarefas (console)</button>
      <button onClick={() => {
        if (tasks.length > 0) {
          const nova = copyWith(tasks[0], { text: "Texto alterado!" });
          const updated = [nova, ...tasks.slice(1)];
          setTasks(updated);
        }
      }}>Alterar 1ª tarefa (copyWith)</button>
    </div>
  );
}

