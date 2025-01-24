import CryptoPricesSection from "../components/CryptoPricesSection";
import metamask from '../assets/metamask.png';
import coinbase from '../assets/coinbase.png';
import binance from '../assets/binance.png';
import others from '../assets/others.svg';
import '../public/css/Home.css'; 

const Home = () => {
  return (
    <>
      <div className="home-container">
        <h1>Lenz Crypto Tracker</h1>
        <p className="home-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error et velit minus quidem laboriosam voluptas harum cumque eum. Doloremque non, ratione totam porro earum ipsam. Dolor sed possimus voluptatem rerum?
        </p>
      </div>

      <section className="container">
        <section className="wallets-section">
          <div className="wallet-card">
            <h2>MetaMask</h2>
            <img className="image" src={metamask} alt="MetaMask" />
            <p>You can connect your MetaMask wallet</p>
            <button className="wallet-button">Connect</button>
          </div>
          <div className="wallet-card">
            <h2>Coinbase</h2>
            <img className="image" src={coinbase} alt="Coinbase" />
            <p>You can connect your Coinbase wallet</p>
            <button className="wallet-button">Connect</button>
          </div>
          <div className="wallet-card">
            <h2>Phantom</h2>
            <img className="image" src={binance} alt="Binance" />
            <p>You can connect your Phantom wallet</p>
            <button className="wallet-button">Connect</button>
          </div>
          <div className="wallet-card">
            <h2>Phantom</h2>
            <img className="image" src={others} alt="Others" />
            <p>You can connect your Phantom wallet</p>
            <button className="wallet-button">Connect</button>
          </div>
        </section>
      </section>

      <section className="some-crypto-prices">
        <CryptoPricesSection />
      </section>

      <section className="about-section">
        <div className="about-card">
          <h2>Sobre mim</h2>
          <p>Olá! Sou Guilherme G, um entusiasta de tecnologia e criptomoedas. 
            Adoro explorar as últimas tendências do mercado e compartilhar 
            conhecimentos sobre blockchain e finanças descentralizadas. 
            Este projeto é uma forma de unir minha paixão por tecnologia 
            e ajudar outros a acompanharem o mundo das criptomoedas.</p>
        </div>
        <div className="about-card">
          <h2>Sobre nós</h2>
          <p>O Lenz Crypto Tracker foi criado para simplificar o acompanhamento 
            de preços e tendências do mercado de criptomoedas. Com uma interface 
            intuitiva e dados em tempo real, nosso objetivo é fornecer ferramentas 
            para que você tome decisões informadas no mundo das finanças digitais.</p>
        </div>
        <div className="about-card">
          <h2>Sobre criptomoedas</h2>
          <p>As criptomoedas estão revolucionando o sistema financeiro global. 
          Elas oferecem descentralização, transparência e novas oportunidades 
          de investimento. Aqui, você pode acompanhar as principais moedas 
          e entender como elas estão moldando o futuro das finanças.</p>
        </div>
      </section>
    </>
  );
};

export default Home;