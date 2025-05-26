import React, { useState, useEffect } from 'react';

function Contar() {
  const [count, setCount] = useState(0);
  const [ativo,setAtivo] = useState(true);
  const [velocidade, setVelocidade] = useState(1000);

  useEffect(()=>{
    let intervalo;
    if(ativo && count < 250){
      intervalo = setInterval(()=>{
        setCount((prev)=> prev +1);
      },velocidade)
    }
    if (count >= 250 && ativo) {
      setAtivo(false);
    }
    return()=> clearInterval(intervalo);
  },[ativo,velocidade,count]);

  const reiniciar = ()=>{
    setCount(0);
    setVelocidade(1000)
  };

   const aumentarVelocidade = () => {
      setVelocidade((prev) => Math.max(100, prev - 200));
  };

    const diminuirVelocidade = () => {
      setVelocidade((prev) => Math.min(5000, prev + 200));
  };


  
  return (

    <div>
      <h1>Contador: {count}</h1>
      <button onClick={()=>setAtivo(!ativo)}>
        {ativo ? 'Pausar': 'Iniciar'}
      </button>
      <button onClick={reiniciar}>
        Reiniciar
      </button>
      <button onClick={aumentarVelocidade}>Aumentar</button>
      <button onClick={diminuirVelocidade}>Diminuir</button>
    </div>
   
  );
}

export default Contar;

