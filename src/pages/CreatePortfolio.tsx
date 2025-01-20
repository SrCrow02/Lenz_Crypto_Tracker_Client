import { useEffect } from "react";
import CryptoPrices from "../components/CryptoPrices";

const CreatePortfolio = () => {
    const portfolios = [];

    useEffect(() => {
        async function fetchPortfolios() {
            try {
                const response = await fetch('http://localhost:3000/')
            } catch (error) {
              // To do
            }
        }
    })
    return (
      <div> 
        <input></input>
      </div>
    );
  };
  
  export default CreatePortfolio;