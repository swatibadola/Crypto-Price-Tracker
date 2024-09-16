import { createContext, useEffect, useState } from "react";

export const coinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    /* Switches coin data from api*/
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-vF4UuhqcDzQpDVUJYnQamxeR'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    /* Using fetchAllCoin whenever the component gets loaded. Using useEffect hook for this! */
    useEffect(() => {
        fetchAllCoin();
    }, [currency])


    /* Passing all variables and functions in contextValue */
    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <coinContext.Provider value={contextValue}>
            {props.children}
        </coinContext.Provider>
    )
}

export default CoinContextProvider;