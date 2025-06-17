import { useState,useEffect } from "react";

const API_KEY = 'cd3de543e638bcb1d0786089c9ae59ae'

const ClimaCard = ({city='São Paulo'}) =>{
    const[weather,setWeather] = useState(null);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);

    useEffect(()=>{
        const fetchWeather = async () =>{
            try{
                setLoading(true)
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
                if(!res.ok) throw new Error('Cidade não encontrada');
                const data = await res.json();
                setWeather(data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchWeather();
    },[city])
    
    if (loading) return <div>Carregando clima...</div>;
    if (error) return <div>Erro: {error}</div>;
    
  return (
    <div style={styles.card}>
      <h2>{weather.name}</h2>
      <p><strong>Temperatura:</strong> {weather.main.temp}°C</p>
      <p><strong>Clima:</strong> {weather.weather[0].description}</p>
      <p><strong>Umidade:</strong> {weather.main.humidity}%</p>
    </div>
  );
};

const styles = {
  card: {
    padding: '16px',
    borderRadius: '12px',
    background: '#f0f4f8',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '300px',
    margin: '14px auto',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  }
};

export default ClimaCard;


	