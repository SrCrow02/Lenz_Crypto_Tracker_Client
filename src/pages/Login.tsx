import { useState } from "react";

const Login = () => {
    const [loginData, setLoginData] = useState(null);
    const [error, setError] = useState(null); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = { email, password };

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();
            setLoginData(data); // Store the response data (e.g., token or user details)
        } catch (err) {
            setError(error); // Display the error message
        }
    };

    return (
        <div>
            {error && <div>Error: {error}</div>} {/* Display error if present */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <div>
                {loginData ? (
                    <pre>{JSON.stringify(loginData, null, 2)}</pre> // Display login response data (e.g., token or user details)
                ) : (
                    <p>Loading...</p> 
                )}
            </div>
        </div>
    );
};
  
export default Login;
