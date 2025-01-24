import { useState } from "react";
import '../public/css/Register.css'
const Register = () => {
    const [registerData, setRegisterData] = useState(null);
    const [error, setError] = useState<string | null>(null); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = { email, password, name, address };

        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const data = await response.json();
            setRegisterData(data); 
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred'); 
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            
            {error && <div className="error-message">Error: {error}</div>}

            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>

            {registerData && (
                <div className="register-data">
                    <h3>Registration Successful!</h3>
                    <pre>{JSON.stringify(registerData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Register;