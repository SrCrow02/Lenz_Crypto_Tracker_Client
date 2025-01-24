import { useEffect, useState } from 'react';

type ApiResponse = {
  coinPrices: Record<string, number>;
};

const COIN_NAMES: Record<string, string> = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  SOL: 'Solana',
  XRP: 'XRP',
  TETHER: "USDT",
  BNB: "BNB",
  ADA: "Cardano", 
  DOGE: "Dogecoin" 
};

const COIN_CHANGES: Record<string, number> = {
  BTC: 4,
  ETH: -0.18,
  SOL: 1.2,
  XRP: -0.76,
  USDT: 0.08,
  BNB: 0.5,
  ADA: 2.3,
  DOGE: -1.5 
};

function CryptoPricesSection() {
  const [prices, setPrices] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch('http://localhost:8000/coins/prices?ids=BTC,ETH,SOL,XRP,USDT,BNB,ADA,DOGE'); 
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        setPrices(data.coinPrices); 
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar preços');
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number): string => {
    return `${change > 0 ? '▲' : '▼'} ${Math.abs(change).toFixed(2)}%`;
  };

  return (
    <div className="crypto-prices-section">
      <h2>Preços de Criptomoedas</h2>
      
      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>Carregando preços...</p>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {!loading && !error && prices && (
        <div className="prices-grid">
          {Object.entries(prices).map(([coin, price]) => (
            <div key={coin} className="price-card">
              <div className="coin-info">
                <span className="coin-rank">#{Object.keys(COIN_NAMES).indexOf(coin) + 1}</span>
                <span className="coin-name">
                  {COIN_NAMES[coin] || coin} · {coin}
                </span>
              </div>
              <span className="price">
                {typeof price === 'number' && !isNaN(price) 
                  ? formatPrice(price)
                  : 'Indisponível'
                }
              </span>
              <span className={`change ${COIN_CHANGES[coin] > 0 ? 'positive' : 'negative'}`}>
                {formatChange(COIN_CHANGES[coin])}
              </span>
              <div className="price-graph">
                <div className="graph-bar" style={{ width: `${Math.abs(COIN_CHANGES[coin])}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

    <style>{`
    .crypto-prices-section {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background-color: #1a1a1a;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        color: #ffffff;
        margin-bottom: 2.3rem;
    }

    .crypto-prices-section h2 {
        color: #00ff88;
        text-align: center;
        margin-bottom: 20px;
    }

    .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .spinner {
        width: 30px;
        height: 30px;
        border: 3px solid #333333;
        border-top: 3px solid #00ff88;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .error {
        background-color: #c62828;
        color: #ffffff;
        padding: 15px;
        border-radius: 4px;
        margin: 10px 0;
        text-align: center;
    }

    .prices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .price-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;
        background-color: #2a2a2a;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .coin-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .coin-rank {
        font-weight: bold;
        color: #00ff88;
    }

    .coin-name {
        font-weight: 500;
        color: #ffffff;
    }

    .price {
        font-family: monospace;
        color: #ffffff;
        font-size: 1.2rem;
    }

    .change {
        font-weight: bold;
    }

    .change.positive {
        color: #00ff88;
    }

    .change.negative {
        color: #ff4444;
    }

    .price-graph {
        height: 10px;
        background-color: #333333;
        border-radius: 5px;
        overflow: hidden;
    }

    .graph-bar {
        height: 100%;
        background-color: #00ff88;
        transition: width 0.3s ease;
    }
    `}</style>
    </div>
  );
}

export default CryptoPricesSection;