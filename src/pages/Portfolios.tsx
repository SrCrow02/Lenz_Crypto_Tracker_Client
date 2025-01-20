import { useEffect, useState } from "react";

interface Portfolio {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

const Portfolios = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await fetch("http://localhost:8000/portfolio/getbyuserid?userid=1", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch portfolios");
                }

                const data = await response.json();
                setPortfolios(data.message.content || []); 
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolios();
    }, []);

    return (
        <div>
            <h1>Portfolios</h1>
            {error && <p>Error: {error}</p>}
            {isLoading ? (
                <p>Loading...</p>
            ) : portfolios.length === 0 ? (
                <p>No portfolios found.</p>
            ) : (
                <ul>
                    {portfolios.map((portfolio) => (
                        <li key={portfolio.id}>
                            <p><strong>ID:</strong> {portfolio.id}</p>
                            <p><strong>Name:</strong> {portfolio.name}</p>
                            <p><strong>User ID:</strong> {portfolio.userId}</p>
                            <p><strong>Created At:</strong> {new Date(portfolio.createdAt).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(portfolio.updatedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Portfolios;
