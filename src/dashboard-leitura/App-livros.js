import Header from "./components/header";
import LivrosList from "./components/lista-livros";
import LeituraCharts from "./components/progresso-grafico";

function AppLeitura(){
    return(
        <div style={{padding: '10px'}}>
            <Header />
            <LivrosList />
        </div>
    )
}

export default AppLeitura;