import { useEffect } from "react";
import CryptoPrices from "../components/CryptoPrices";

const CreatePortfolio = () => {
    const portfolios = [];

    useEffect(() => {
        async function fetchPortfolios() {
            try {
                const response = await fetch('')
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