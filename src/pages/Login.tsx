import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState<string | null>(null); 
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
      setLoginData(data);

      localStorage.setItem('authToken', `${data.message.token}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred'); 
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      {error && <div className="error-message">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="login-data">
        {loginData ? (
          <pre>{JSON.stringify(loginData, null, 2)}</pre> 
        ) : (
          <p>No data yet...</p> 
        )}
      </div>

      <style>{`
        /* Container principal */
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #1a1a1a; /* Fundo escuro */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Sombra sutil */
          color: #ffffff; /* Texto branco */
        }

        .login-container h1 {
          color: #00ff88; /* Título em verde neon */
          text-align: center;
          margin-bottom: 20px;
        }

        /* Mensagem de erro */
        .error-message {
          background-color: #c62828; /* Vermelho escuro */
          color: #ffffff; /* Texto branco */
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
          text-align: center;
        }

        /* Formulário */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-label {
          color: #b3b3b3; /* Texto cinza claro */
          font-size: 0.9rem;
        }

        .form-input {
          padding: 10px;
          border: 1px solid #333333; /* Borda cinza escura */
          border-radius: 4px;
          background-color: #2a2a2a; /* Fundo escuro */
          color: #ffffff; /* Texto branco */
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #00ff88; /* Borda verde neon ao focar */
          outline: none;
        }

        /* Botão de login */
        .login-button {
          background-color: #00ff88; /* Verde neon */
          color: #1a1a1a; /* Texto escuro */
          border: none;
          padding: 10px;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-button:hover {
          background-color: #00cc66; /* Verde mais suave no hover */
        }

        .login-data {
          margin-top: 20px;
          background-color: #2a2a2a; /* Fundo escuro */
          padding: 15px;
          border-radius: 4px;
          color: #ffffff; /* Texto branco */
        }

        .login-data pre {
          margin: 0;
          font-size: 0.9rem;
          white-space: pre-wrap; 
        }
      `}</style>
    </div>
  );
};

export default Login;