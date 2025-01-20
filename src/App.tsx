import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Prices from './pages/Prices';
import Portfolios from './pages/Portfolios';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/precos" element={<Prices />} />
            <Route path="/portfolio" element={<Portfolios />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;