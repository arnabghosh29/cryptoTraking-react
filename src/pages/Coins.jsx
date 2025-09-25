// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { CryptoState } from '../CryptoContext'
// import axios from 'axios'
// import { SingleCoin } from '../config/api'
// import { makeStyles } from '@mui/styles'
// import CoinInfo from '../components/CoinInfo'

// const Coins = () => {
//     const { id } = useParams()
//     const [coin, setCoin] = useState()
//     const { currency, symbol } = CryptoState()
//     const fetchCoin = async () => {
//         const { data } = await axios.get(SingleCoin(id))
//         setCoin(data)
//     }
//     console.log((coin));
//     useEffect(() => {
//         fetchCoin()
//     }, [])

//     const useStyles = makeStyles((theme) => ({
//         container: {
//             display: "flex",
//             [theme.breakpoints.down("md")]: {
//                 flexDirection: "column",
//                 alignItems: "center"
//             }
//         },
//         sidebar: {
//             width: "30%",
//             [theme.breakpoints.down("md")]: {
//                 width: "100%"
//             },
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginTop: 25,
//             borderRight: "2px solid grey"
//         }
//     }))
//     const classes = useStyles()


//     return (
//         <div className={classes.container}>
//             <div className={classes.sidebar}>
//                 {/* sidebar */}
//             </div>
//             <div >
//                 {/* chart */}
//                 <CoinInfo coin={coin} />
//             </div>
//         </div>
//     )
// }

// export default Coins


import { Box, Button, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Coins = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol, user, watchlist, setAlert } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
    }, []);
    const inWatchlist = watchlist.includes(coin?.id)
    const addToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid)
        try {
            await setDoc(coinRef,
                { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] }
            )
            setAlert({
                open: true,
                message: `${coin.name}Added to watchlist`,
                type: "success"
            });

        } catch (error) {

        }
    }
    const removeFromWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid)
        try {
            await setDoc(coinRef,
                { coins: watchlist.filter((watch) => watch !== coin?.id) },
                { merge: "true" }
            )
            setAlert({
                open: true,
                message: `${coin.name}Remove to watchlist`,
                type: "success"
            });

        } catch (error) {

        }

    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    width: { xs: "100%", md: "30%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 3,
                    borderRight: { md: "2px solid grey", xs: "none" },
                    p: 2,
                }}
            >
                {/* Image */}
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="100"
                    style={{ marginBottom: 20 }}
                />

                {/* Name */}
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}
                >
                    {coin?.name}
                </Typography>

                {/* Rank */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Rank:{" "}
                        <span style={{ color: "gold" }}>
                            {coin?.market_cap_rank}
                        </span>
                    </Typography>
                </Box>

                {/* Current Price */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Current Price:{" "}
                        <span style={{ color: "lightgreen" }}>
                            {symbol}{" "}
                            {coin?.market_data.current_price[currency.toLowerCase()].toLocaleString()}
                        </span>
                    </Typography>
                </Box>

                {/* Market Cap */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Market Cap:{" "}
                        <span style={{ color: "skyblue" }}>
                            {symbol}{" "}
                            {coin?.market_data.market_cap[currency.toLowerCase()]
                                .toLocaleString()
                                .slice(0, -6)}
                            M
                        </span>

                    </Typography>
                    {user && (
                        <Button variant="outlined" style={{ width: "100%", height: 40, backgroundColor: inWatchlist ? "red" : "#EEBC1D" }}
                            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                        >{inWatchlist ? "Remove for watchlist" : "Add to Watchlist"}</Button>
                    )}
                </Box>
            </Box>

            {/* Chart Section */}
            <Box sx={{ flex: 1 }}>
                {/* <CoinInfo coin={coin} coinId={coin.id} days={30} currency={currency} /> */}
                {coin && <CoinInfo coinId={coin.id} days={30} currency={currency} />}

            </Box>
        </Box>
    );
};

export default Coins;

