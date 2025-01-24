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
  BNB: "BNB"
};

function CryptoPrices() {
  const [prices, setPrices] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch('http://localhost:8000/coins/prices?ids=BTC,ETH,SOL,XRP,USDT,BNB');
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

  return (
    <div className="container">
      <h1>Preços de Criptomoedas</h1>
      
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
              <span className="coin-name">
                {COIN_NAMES[coin] || coin}
              </span>
              <span className="price">
                {typeof price === 'number' && !isNaN(price) 
                  ? formatPrice(price)
                  : 'Indisponível'
                }
              </span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #1a1a1a; 
          color: #ffffff; 
          border-radius: 8px;
          border: 1px solid #333333; 
        }

        h1 {
          text-align: center;
          color: #00ff88; /* Título em verde neon */
          margin-bottom: 30px;
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
          gap: 15px;
        }

        .price-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #2a2a2a; 
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
        }

        .coin-name {
          font-weight: 500;
          color: #00ff88; 
        }

        .price {
          font-family: monospace;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default CryptoPrices;