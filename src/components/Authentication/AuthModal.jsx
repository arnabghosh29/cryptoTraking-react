import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';


import Login from "./Login"
import SignUp from "./SignUp"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(value);


    return (
        <div>
            <Button variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    marginLeft: 15,
                    backgroundColor: "#EEBC1D"
                }}
                onClick={handleOpen}>Login</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Tabs value={value}
                            onChange={handleChange}
                            style={{ borderRadius: 10, backgroundColor: "transparent", color: "white" }}>
                            <Tab label="Login" />
                            <Tab label="Sign Up" />
                        </Tabs>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <SignUp handleClose={handleClose} />}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}