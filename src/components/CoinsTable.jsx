import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Carousel'

const CoinsTable = () => {
    // const [coins, setCoins] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { currency, symbol, coins, loading, fatchCoins } = CryptoState();
    const naviget = useNavigate()
    // const fatchCoins = async () => {
    //     setLoading(true)
    //     const { data } = await axios.get(CoinList(currency))
    //     setCoins(data)
    //     setLoading(false)
    // }
    useEffect(() => {
        fatchCoins()
    }, [currency])
    console.log(coins);
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#0e2acbd3"
            },
            // type: "dark"
        },
    });
    const handleSearch = () => {
        return coins.filter(
            (coin) => coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };
    // const useStyles = makeStyles(() => ({

    // }))
    // const classes = useStyles()
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography variant='h4' style={{ margin: 18, fontFamily: "Montserrat", color: "#6495ED" }}>
                    Cryptocurrency Price by Market Cap
                </Typography>
                <TextField label="Search For a Cryto Currency.." variant='outlined' style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />) :
                            (<Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h change", "Market Cap"].map((head) => (
                                            <TableCell style={{ color: "black", fontWeight: "700", fontFamily: "Montserrat" }} key={head} align={head === "Coin" ? "" : "right"}>
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={() => naviget(`/coins/${row.id}`)}
                                                // className={classes.row}
                                                sx={{
                                                    backgroundColor: "#16171a",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        backgroundColor: "#131111",
                                                    },

                                                }}
                                                key={row.name}
                                            >
                                                <TableCell component="th" scope='row' style={{ display: "flex", gap: 10 }}>
                                                    <img src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10, color: "#1e90ff " }} />
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <span style={{ textTransform: "uppercase", fontSize: 22, color: "#1e90ff" }}>
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "#87ceeb" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                {/* <TableCell align='right' style={{ color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500 }}>
                                                    {profit && "+"}{profit && "+"}{row.price_change_percentage_24h?.toFixed(2)}%

                                                </TableCell> */}
                                                <TableCell align='right' style={{ color: "#0ECB81", fontWeight: 600 }}>
                                                    {symbol}{""}{numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align='right' style={{ color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500 }}
                                                >
                                                    {profit && "+"}{row.price_change_percentage_24h?.toFixed(2)}%

                                                </TableCell>
                                                <TableCell align='right' style={{ color: "#0ECB81", fontWeight: 600 }}>
                                                    {symbol}{""}{numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                                    M
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>)
                    }
                </TableContainer>
                <Pagination
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#FF9800",
                        },
                    }}
                    style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center" }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value)
                        window.scroll(0, 450)
                    }

                    }
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable