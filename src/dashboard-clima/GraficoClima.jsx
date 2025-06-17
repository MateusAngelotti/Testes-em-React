import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const API_KEY = 'API_KEY'

const GraficoPrevisao = ({city}) => {
    const[data,setData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt`);
        const json = await res.json();
        const dailyData = json.list.filter(item => item.dt_txt.includes("12:00:00")).map(item => ({
          date: item.dt_txt.split(' ')[0],
          temp: item.main.temp
        }));
        setData(dailyData);
      } catch (err) {
        console.error('Erro ao buscar previsão:', err);
      }
    };

    fetchForecast();
  }, [city]);

    return (
    <div style={{ width: '100%', height: 300 }}>
      <h3 style={{ textAlign: 'center' }}>Previsão para os próximos dias</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#0077ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoPrevisao;