import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './login';
import SupermercadoApp from '../supermercado';
import Calculadora from '../Calculadora';
import Temperatura from '../conversor-temperatura';
import Pokedex from '../pokedex';
import IMC from '../IMC';
import Contar from '../contador'
import Jogo from '../JogodaVelha';
import Lista from '../To-do';
import Checklist from '../viajem-check';
import GeradorNumerico from '../numero-aleartório';
import FormulárioResponsivo from '../formulário';
import Cadastrar from '../cadastro';
import UsuarioApi from '../usuarios';

function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/supermercado' element={<SupermercadoApp/>} />
                <Route path='/pokedex' element={<Pokedex/>} />
                <Route path='/calculadora' element={<Calculadora/>} />
                <Route path='/temperatura' element={<Temperatura/>} />
                <Route path='/imc' element={<IMC/>} />
                <Route path='/contador' element={<Contar/>} />
                <Route path='/velha' element={<Jogo/>} />
                <Route path='/to-do' element={<Lista/>} />
                <Route path='/viajem' element={<Checklist/>} />
                <Route path='/gerador-num' element={<GeradorNumerico/>} />
                <Route path='/formulario' element={<FormulárioResponsivo/>} />
                <Route path='/cadastro' element={<Cadastrar/>} />
                <Route path='/usuarios' element={<UsuarioApi/>} />
                

                
            </Routes>
        </Router>
    )
}

export default Rotas;