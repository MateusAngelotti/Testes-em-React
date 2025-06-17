import { use, useEffect, useState } from 'react';
import axios from 'axios';

function Cripto(){
    const[coins,setCoins] = useState([]);
    const[loading,setLoading] = useState(true);
    const[refresh,setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [usdResponse, brlResponse] = await Promise.all([
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }),
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'brl',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }),
      ]);

      // Cria um mapa com os dados em BRL usando o id da moeda
      const brlMap = {};
      brlResponse.data.forEach((coin) => {
        brlMap[coin.id] = coin.current_price;
      });

      // Mapeia os dados do USD e adiciona os preços em BRL do mapa
      const combined = usdResponse.data.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        usd: coin.current_price,
        brl: brlMap[coin.id] || 0,
        change: coin.price_change_percentage_24h,
      }));

      setCoins(combined);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    fetchData();
  },[refresh]);

  return(
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Painel Criptos</h1>
        <button onClick={() => setRefresh(!refresh)}>🔄 Atualizar</button>
        {loading?(
            <p>Carregando</p>
        ):(
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Nome</th>
                        <th>Preço (USD)</th>
                        <th>Preço (BRL)</th>
                        <th>Variação</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin)=>(
              <tr key={coin.id}>
                    <td>
                    <img src={coin.image} alt={coin.name} width="30" />
                    </td>
                    <td>{coin.name} ({coin.symbol.toUpperCase()})</td>
                    <td>${coin.usd.toLocaleString()}</td>
                    <td>R${coin.brl.toLocaleString()}</td>
                    <td
                    style={{
                        color: coin.change >= 0 ? 'green' : 'red',
                    }}
                    >
                    {coin.change.toFixed(2)}%
                    </td>
              </tr>
                    ))}

                </tbody>
            </table>
        )}

    </div>
  )

}

export default Cripto;