import React, { useState } from 'react';
import ClimaCard from './DashboardClima';
import GraficoPrevisao from './GraficoClima';
import BuscaCidade from './SearchBar';


function Temp() {
  const [city, setCity] = useState('São Paulo');

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Dashboard de Clima</h1>
      <BuscaCidade onSearch={setCity} />
      <ClimaCard city={city} />
      <GraficoPrevisao city={city} />
    </div>
  );
}

export default Temp;