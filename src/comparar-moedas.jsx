import {useState} from 'react';

export default function CurrencyPrice(){
    const[from,setFrom] = useState("USD");
    const[to,setTo] = useState("EUR");
    const[rate,setRate] = useState(null);
    const [amount, setAmount] = useState(1);

    
    const comparar = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Digite um valor válido!");
      return;
    }

        const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=9a9be30cfba40976f14ba34494261251`);
        const data = await res.json();
        console.log(data)
        setRate(data.result)
    }

    return (
        <div style={{ padding: "20px",margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ fontSize:"24px", fontWeight: "bold", marginBottom: "16px" }}>Conversor de Moedas</h1>

                <div style={{ marginBottom: "10px" }}>
                <label>Valor:</label><br />
                <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>DE:</label>
                <select value={from} onChange={e=>setFrom(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="BRL">BRL</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Para:</label>
                <select value={to} onChange={e=>setTo(e.target.value)}>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="BRL">BRL</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>

            <button onClick={comparar}
            style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
            }}>Comparar</button>
            {rate && (
                <p style={{ marginTop: "16px" }}>
                1 {from} = <strong>{rate.toFixed(4)}</strong> {to}
                </p>
            )}
        </div>
    )
}