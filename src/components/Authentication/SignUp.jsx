import React from 'react'
import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"
import { CryptoState } from '../../CryptoContext';

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = CryptoState();
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Password do not match',
        type: "error"

      });
      return;
    }
    try {
      const resutl = await createUserWithEmailAndPassword(auth, email, password)
      console.log("result", resutl);

      setAlert({
        open: true,
        message: `Sing in Successfull Wellcome${resutl.user.email}`,
        type: "success"
      })
      handleClose()

    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      })
      return


    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          p={3}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            variant="outlined"
            type="email"
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            variant="outlined"
            type="password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          <TextField
            variant="outlined"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </form>

    </>
  )
}

export default SignUp