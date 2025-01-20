import { useEffect, useState } from 'react';

// Atualizando o tipo para refletir a estrutura real da API
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
        }

        h1 {
          text-align: center;
          color: #333;
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
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error {
          background-color: #ffebee;
          color: #c62828;
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
          background-color: #f8f9fa;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .coin-name {
          font-weight: 500;
          color: #2c3e50;
        }

        .price {
          font-family: monospace;
          color: #2c3e50;
        }
      `}</style>
    </div>
  );
}

export default CryptoPrices;