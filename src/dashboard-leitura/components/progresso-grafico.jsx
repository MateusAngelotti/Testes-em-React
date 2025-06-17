import {PieChart, Pie, Cell, Tooltip} from 'recharts';

export default function LeituraCharts({books}){
  const totalMeta = 15;
  const lidos = books.filter(book => book.status === 'concluído').length;
  const restante = totalMeta - lidos;

  const data = [
  { name: 'Lidos', value: lidos },
  { name: 'Restante', value: restante > 0 ? restante : 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return(
        <div>
      <h2> Progresso da Meta Anual</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
