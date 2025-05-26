import react,{useState,useEffect} from "react";

function SupermercadoApp(){
    const[nomeProduto,setNomeProduto] = useState('');
    const[precoProduto,setPrecoProduto] = useState('');
    const[itens,setItens] = useState([]);

    useEffect(()=>{
        const itensSalvos = localStorage.getItem('itensSupermercado');
        if(itensSalvos){
            setItens(JSON.parse(itensSalvos));
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem('itensSupermercado',JSON.stringify(itens));
    },[itens]);

    let handleAdicionarProdutos=()=>{
        if(!nomeProduto || !precoProduto) return;

        let novoItem = {
            nome: nomeProduto,
            valor:parseFloat(precoProduto),
        };
        setItens([...itens, novoItem]);
        setNomeProduto('');
        setPrecoProduto('');
    };

    let handleLimpar =()=>{
        setItens([]);
        localStorage.removeItem('itensSupermercado');
    };

    let somaTotal = itens.reduce((acc,itens)=>acc+itens.valor, 0).toFixed(2);


    return(
        <div className="App">
            <header>
                <h2>App Supermercado</h2>
            </header>

             <div className="lista-cadastro">
                <input
                type="text"
                placeholder="nome do produto..."
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                />
                <input
                type="number"
                step="0.01"
                value={precoProduto}
                onChange={(e) => setPrecoProduto(parseFloat(e.target.value))}
                />
                <input type="submit" value="Cadastrar" onClick={handleAdicionarProdutos} />
            </div>

            <div className="lista-produtos">
                {itens.map((itens, index)=>(
                    <div key={index} className="lista-produto-single">
                        <h3>{itens.nome}</h3>
                        <h3 className="price-produto">
                        <span>R${itens.valor.toFixed(2)}</span>
                        </h3>
                    </div>
                ))}
            </div>

            <div className="soma-produto">
                <h1>Total: R${somaTotal}</h1>
            </div>

            <button onClick={handleLimpar}>Limpar Carrinho</button>
        </div>
    )
}

export default SupermercadoApp;