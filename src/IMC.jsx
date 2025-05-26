import react,{useState} from "react";

function IMC(){
    const [altura,setAltura] = useState("");
    const [peso,setPeso] = useState("");
    const [resultado, setResultado] = useState({ imc: null, classificacao: '' });
    const [erro,setErro] = useState('');

    let classificarIMC = (imc) => {
        if (!imc) return '';
        const valor = parseFloat(imc);
        if (valor < 18.5) return 'Abaixo do peso';
        if (valor < 25) return 'Peso normal';
        if (valor < 30) return 'Sobrepeso';
        return 'Obesidade';
    };

    let calcularIMC=()=>{
        let pesoNum = parseFloat(peso);
        let alturaNum = parseFloat(altura);
            if (!peso || !altura) {
                setErro('Preencha ambos os campos.');
                setResultado({ imc: null, classificacao: '' });
                return;
                }

                if (isNaN(pesoNum) || isNaN(alturaNum)) {
                setErro('Insira valores numéricos válidos.');
                setResultado({ imc: null, classificacao: '' });
                return;
                }

                if (pesoNum <= 0 || alturaNum <= 0) {
                setErro('Peso e altura devem ser maiores que zero.');
                setResultado({ imc: null, classificacao: '' });
                return;
                }

                if(alturaNum > 3){
                  setErro('Altura em metros, por favor')
                  setResultado({imc:null, classificacao: ''});
                  return;
                }
                setErro('');


        if (!pesoNum || !alturaNum || alturaNum <= 0) return null;

        let imc = pesoNum/(alturaNum * alturaNum);
        let imcArredondado = imc.toFixed(2);
        const classificacao = classificarIMC(imc);

        setResultado({ imc: imcArredondado, classificacao });
    }


    

    return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Calculadora de IMC</h2>
      <div>
        <label>Peso (kg): </label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
      </div>
      <div>
        <label>Altura (m): </label>
        <input
          type="number"
          step="0.01"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
        <button onClick={calcularIMC} style={{ marginTop: '10px' }}>
        Calcular
      </button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>IMC:</strong> {resultado.imc && <span>{resultado.imc}</span>}
        <br />
        <strong>Classificação:</strong> {resultado.classificacao}
      </div>
    </div>
  );

    
}

export default IMC;