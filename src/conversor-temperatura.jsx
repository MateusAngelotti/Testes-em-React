import { useState } from "react"

function Temperatura(){
    const [celsius,setCelsius] = useState('')
    const [fahrenheit,setFahrenheit] = useState('')
    const [kelvin, setKelvin] = useState('')

    let handleCelsius=(e)=>{
        let value = e.target.value;
        setCelsius(value);
        setFahrenheit(value? (parseFloat(value) * 9/5 + 32).toFixed(2) : '');
        setKelvin(value?(parseFloat(value)+273).toFixed(2):'');

    }
    let handleFahrenheit=(e)=>{
        let value = e.target.value;
        setFahrenheit(value);
        setCelsius(value? ((parseFloat(value)-32)*5/9).toFixed(2) : '');
        setKelvin(value?(((parseFloat(value)-32)*5/9)+273).toFixed(2):'');

    }
    let handleKelvin=(e)=>{
        let value = e.target.value;
        setKelvin(value);
        setFahrenheit(value? (((parseFloat(value)-273)*9/5)+32).toFixed(2) : '');
        setCelsius(value?(parseFloat(value)-273).toFixed(2):'');

    }
    return (
    <div>
      <h2>Conversor de Temperatura</h2>
      <div style={{marginBottom:'10px'}}>
        <label>Celsius:</label>
        <input
          type="number"
          value={celsius}
          onChange={handleCelsius}
        />
        <span>°C</span>
      </div>
      <div style={{marginBottom:'10px'}}>
        <label>Fahrenheit:</label>
        <input
          type="number"
          value={fahrenheit}
          onChange={handleFahrenheit}
        />
        <span>°F</span>
      </div>
      <div>
        <label>Kelvin:</label>
        <input
            type="number"
            value={kelvin}
            onChange={handleKelvin}/>
        <span>°K</span>
      </div>
    </div>
  );

}

export default Temperatura;

    
 