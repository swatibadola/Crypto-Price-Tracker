import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { coinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom' /* Link used to open another page when clicked on an element */

const Home = () => {
    const { allCoin, currency } = useContext(coinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');
    /* using input data we will filter the API data and will display the filtered table in result */

    /* using input handler we will store the data into input */
    const inputHandler = (e) => {
        setInput(e.target.value);

        /* adding if statement to show the first 10 coins in the data when nothing is searched */
        if (e.target.value === "") {
            setDisplayCoin(allCoin);
        }
    }

    const searchHandler = async (e) => {
        /* prevent site reloading when searching */
        e.preventDefault();

        /* to filter the data */
        const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        // bitcoin
        // bit

        /* To display updated data in the table */
        setDisplayCoin(coins);
    }

    /* Adding allCoin data in displayCoin */
    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin])

    return (
        <div className='home'>
            <div className='hero'>
                <h1>Largest <br /> Crypto Marketplace</h1>
                <p>Welcome to The Coin Scout, your one-stop shop for trading a wide range of cryptocurrencies. Discover a secure and user-friendly platform designed to simplify your crypto journey.</p>
                <form onSubmit={searchHandler}>
                    <input
                        onChange={inputHandler}
                        list='coinlist'
                        value={input}
                        type="text"
                        placeholder='Search crypto...'
                        required />

                    {/* Adding datalist in the search box to show in the dropdown menu */}
                    <datalist id='coinlist'>
                        {allCoin.map((item, index) => (<option
                            key={index}
                            value={item.name} />
                        ))}
                    </datalist>


                    <button type='submit'>Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24Hr Change</p>
                    <p style={{ textAlign: "right" }}>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0, 10).map((item, index) => (
                        <Link
                        to={`/coin/${item.id}`}
                            className="table-layout"
                            key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div>
                                <img src={item.image} alt="Image" />
                                <p>{item.name + " " + item.symbol}</p>
                            </div>
                            {/* .toLocaleString() - used to add a comma operator in the digits */}
                            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
                            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Home