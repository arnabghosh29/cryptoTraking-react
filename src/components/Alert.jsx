import React from 'react'
import { CryptoState } from '../CryptoContext'
import { Snackbar } from '@mui/material'
import Alert from "@mui/material/Alert";


const Alerts = () => {
    const { alert, setAlert } = CryptoState()


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ open: false })
    };

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Note archived"
        >
            <Alert
                // onClose={handleClose}
                // elevation={10}
                // variant={alert.type}
                onClose={handleClose}
                severity={alert.type}     //  success / error / warning / info
                sx={{ width: "100%" }}
                elevation={10}
                variant="filled"
            >{alert.message}
            </Alert>

        </Snackbar>
    )
}

export default Alerts