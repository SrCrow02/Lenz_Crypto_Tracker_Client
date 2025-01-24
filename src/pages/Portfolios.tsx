import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import '../public/css/Portfolio.css';

interface Portfolio {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    transactionCount?: number; 
    totalValue?: number; 
}

interface DecodedToken {
    userId: number;
    role: string;
}

const Portfolios = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const decodedToken = jwtDecode<DecodedToken>(token);
                const userId = decodedToken.userId;

                const response = await fetch(`http://localhost:8000/portfolio/getbyuserid?userid=${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch portfolios");
                }

                const data = await response.json();
                const portfoliosWithStats = data.message.content.map((portfolio: Portfolio) => ({
                    ...portfolio,
                    transactionCount: Math.floor(Math.random() * 20),
                    totalValue: Math.floor(Math.random() * 10000), 
                }));
                setPortfolios(portfoliosWithStats);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolios();
    }, []);

    return (
        <div className="portfolios-container">
            <h1>Portfolios</h1>
            {error && <p className="error-message">Error: {error}</p>}
            {isLoading ? (
                <p className="loading-message">Loading...</p>
            ) : portfolios.length === 0 ? (
                <p className="no-portfolios">No portfolios found.</p>
            ) : (
                <ul className="portfolios-list">
                    {portfolios.map((portfolio) => (
                        <li key={portfolio.id} className="portfolio-card">
                            <p><strong>ID:</strong> {portfolio.id}</p>
                            <p><strong>Name:</strong> {portfolio.name}</p>
                            <p><strong>User ID:</strong> {portfolio.userId}</p>
                            <p><strong>Created At:</strong> {new Date(portfolio.createdAt).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(portfolio.updatedAt).toLocaleString()}</p>
                            <div className="portfolio-stats">
                                <p><strong>Transactions:</strong> {portfolio.transactionCount}</p>
                                <p><strong>Total Value:</strong> ${portfolio.totalValue?.toLocaleString()}</p>
                            </div>
                            <button className="analysis-button">Analysis</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Portfolios;