import { useState,useEffect } from "react";

function GeradorNumerico(){
    const[numero,setNumero] = useState(null);
    const[intervalo,setIntervalo] = useState(null)
    const[historico,setHistorico] = useState([])


    let gerarNumero=()=>{
        let max = parseInt(intervalo)
        if(!isNaN(max) && max>0){
        const random = Math.floor(Math.random() *max) +1;
        setNumero(random);
        setHistorico((prev)=>[...prev,random])
        }else{
            alert("Por favor insira um numero valido")
        }

    }

    useEffect(()=>{
        if(numero!== null){
            console.log(`Novo numero gerado: ${numero}`);
        }
    },[numero])
    return(
        <div>
            <h2>Gerador de Numeros</h2>
            <h4>Intervalo do Gerador</h4>
            <input
            type="number"
            value={intervalo}
            onChange={(e)=>setIntervalo(e.target.value)}
            placeholder="Digite maximo"/>
            <h4> {numero !== null ? (
                <span style={{ fontSize: '2rem', color: 'green', fontWeight: 'bold' }}>
                {numero}
                </span>
            ) : (
                'Clique no botão para gerar um número'
            )}</h4>
            <button onClick={gerarNumero}>Gerar Numero</button>

            <h4>Historico de Numeros</h4>
            <button onClick={() => setHistorico([])}>Limpar Histórico</button>
            {historico.length === 0?(
                <p>Nenhum numero gerado</p>
            ):(
                <ul>
                    {historico.map((num,index)=>(
                        <li key={index}>{num}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default GeradorNumerico;