import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ActivityChart({data}){
    return (
        <div>
            <h2 className="section-title">Minutos por Dia</h2>
            <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" fill="#3b82f6" />
            </BarChart>
      </div>
  );
}