import {useState} from 'react';
import './DashboardFinance.css'

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardFinance=()=>{
    const[contas,setContas] = useState([
        {id:1,descricao:'Salário',valor:2800},
        {id:2,descricao:'Aluguel',valor:-800},
        {id:3,descricao:'Mercado',valor:-600},
        {id:4,descricao:'Extras',valor:500},
    ]);

    
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipoTransacao, setTipoTransacao] = useState('receita');

    const receitas = contas
    .filter(c=>c.valor>0)
    .reduce((acc,c)=>acc+ c.valor,0);

    const despesas = contas
    .filter(c=>c.valor<0)
    .reduce((acc,c)=>acc + c.valor,0);

    const saldo = receitas + despesas;

    const handleAddTransaction=(e)=>{
      e.preventDefault();
      if(!descricao || !valor){
      alert('Por favor, preencha a descrição e o valor.');
      return;
      }

      const valorNumerico = parseFloat(valor);
        if (isNaN(valorNumerico)) {
          alert('Por favor, insira um valor numérico válido.');
          return;
        }

      const newTransaction ={
        id: contas.length > 0 ? Math.max(...contas.map(conta => conta.id)) + 1 : 1,
        descricao,
        valor: tipoTransacao === 'despesa' ? -Math.abs(valorNumerico) : Math.abs(valorNumerico),
        tipo: tipoTransacao,
      };

      setContas([...contas,newTransaction])
      setDescricao(' ');
      setValor(' ');
      setTipoTransacao('receita');
    };

    const handleRemoveTransaction=(id)=>{
      setContas(contas.filter(conta => conta.id !== id));
    }

    const chartData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        label: 'Valores',
        data: [receitas, Math.abs(despesas)], // Despesas em valor absoluto para o gráfico
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

    const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Visão Geral de Receitas e Despesas',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += `R$ ${context.raw.toFixed(2)}`;
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'R$ ' + value.toFixed(2);
          }
        }
      }
    }
  };


   return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Financeiro Pessoal</h2>

      <div className="summary-cards">
        <div className="summary-item">
          <h4 className="summary-item h4">Receitas</h4>
          <p className="revenue-value">R$ {receitas.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h4 className="summary-item h4">Despesas</h4>
          <p className="expense-value">R$ {Math.abs(despesas).toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h4 className="summary-item h4">Saldo</h4>
          <p className={saldo >= 0 ? 'balance-value-positive' : 'balance-value-negative'}>R$ {saldo.toFixed(2)}</p>
        </div>
      </div>

      <hr className="divider" />

      {/* Gráfico de Barras */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <hr className="divider" />

      {/* Formulário para adicionar transações */}
      <h3 className="section-title">Adicionar Nova Transação</h3>
      <form onSubmit={handleAddTransaction} className="add-transaction-form">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor (sem sinal, ex: 100)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <select value={tipoTransacao} onChange={(e) => setTipoTransacao(e.target.value)}
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1em' }}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <button type="submit">
          Adicionar Transação
        </button>
      </form>

      <hr className="divider" />

      {/* Lista de transações */}
      <h3 className="section-title">Minhas Transações</h3>
      {contas.length === 0 ? (
        <p className="transactions-list-empty">Nenhuma transação cadastrada ainda.</p>
      ) : (
        <ul className="transactions-list">
          {contas.map((conta) => (
            <li key={conta.id} className="transaction-item">
              <span className="transaction-description">{conta.descricao}</span>
              <span className={conta.valor >= 0 ? 'transaction-value-positive' : 'transaction-value-negative'}>
                R$ {conta.valor.toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveTransaction(conta.id)}
                className="remove-button"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardFinance;