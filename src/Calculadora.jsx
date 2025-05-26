import { useState } from "react";

function Calculadora(){


        const [num1, setNum1] = useState(null);
        const [num2, setNum2] = useState(null);
        const [sinal, setSinal] = useState('+');
        const [resultado, setResultado] = useState(null);
        const [mensagemErro, setMensagemErro] = useState('');

        let vamosCalcular = (e) => {
            e.preventDefault();
            setMensagemErro('');
            setResultado(null);

                        
             if (isNaN(num1) || isNaN(num2)) {
                setMensagemErro('Por favor, insira números válidos.');
                return;
    }

        let result;
        if(sinal === '+'){
            result = num1 + num2;
        }else if(sinal === '-'){
            result = num1 - num2;
        }else if(sinal === '*'){
            result = num1 * num2;
        }else if(sinal === '/'){
            if (num2 === 0) {
                setMensagemErro('Divisão por zero é impossivel ')
                return
            }
            result = num1/num2
        }
        else{
            setMensagemErro('Nenhum operador válido')
            return
        }
        setResultado(result);


   }
    return(
        <div>
            <h2>Calculadora</h2>
            <form onSubmit={vamosCalcular}>
                <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(parseFloat(e.target.value))}
                placeholder="Digite o primeiro número"
                />
            <select value={sinal} onChange={(e)=> setSinal(e.target.value)}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(parseFloat(e.target.value))}
                placeholder="Digite o segundo número"
                />
            <button type="submit">Calcular</button>
            </form>
            {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
            {resultado !== null && (
            <p>
            Resultado: {num1} {sinal} ({num2}) = <b>{resultado}</b>
            </p>
        )}
        </div>
    )

}
           

export default Calculadora;