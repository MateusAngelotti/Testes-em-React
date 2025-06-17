import { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WatchTimeChart = ({ historicoAssistidos = [] }) => {
    const [filtro, setFiltro] = useState('ano');

    const dadosProcessados = useMemo(() => {
        const contagem = {};

        historicoAssistidos.forEach((item) => {
            if (!item?.data) return; // Ignora se não tiver data

            const [ano, mes] = item.data.split('-');
            const mesIndex = parseInt(mes) - 1;
            const mesNome = meses[mesIndex] || 'Desconhecido';

            if (!contagem[mesNome]) {
                contagem[mesNome] = 0;
            }
            contagem[mesNome] += item.horas || 2; // Se não tiver horas, soma 2 por padrão
        });

        let dadosArray = meses.map((mes) => ({
            mes,
            horas: contagem[mes] || 0,
        }));

        if (filtro === '6meses') {
            dadosArray = dadosArray.slice(-6);
        }
        if (filtro === '3meses') {
            dadosArray = dadosArray.slice(-3);
        }

        return dadosArray;
    }, [historicoAssistidos, filtro]);

    return (
        <div style={{ marginBottom: 40 }}>
            <h2>Horas Assistidas por Mês</h2>

            <div style={{ marginBottom: 10 }}>
                <label>Período: </label>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="ano">Ano Atual</option>
                    <option value="6meses">Últimos 6 meses</option>
                    <option value="3meses">Últimos 3 meses</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                    data={dadosProcessados}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="horas" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WatchTimeChart;