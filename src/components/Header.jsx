import React from 'react'
import AppBar from "@mui/material/AppBar";
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { CryptoState } from '../CryptoContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthModel from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "bold",
        cursor: "pointer"
    }
}))

const Header = () => {
    const classer = useStyles()
    const navigate = useNavigate()
    const { currency, setCurrency, user } = CryptoState()
    console.log(currency);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff"
            },
            // type: "dark"
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static' style={{ background: "#272c3a" }}>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate("/")} className={classer.title} variant='h6'>Crypto Tracker</Typography>
                        <Select variant='outlined' style={{ with: 100, height: 30, marginLeft: 15, }}
                            value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem style={{ color: "white" }} value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModel />}

                    </Toolbar>

                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header