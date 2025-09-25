// import './App.css'
// import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
// import Home from './pages/Home'
// import Coins from './pages/Coins'
// import Header from './components/Header'
// import { makeStyles } from "@mui/styles";
// import CryptoContext from './CryptoContext'
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Alerts from './components/Alert'
// // import { ThemeProvider } from '@mui/styles';

// const useStyles = makeStyles(() => ({
//   App: {
//     backgroundColor: "#14161a",
//     minHeight: "100vh",
//     color: "white",
//   },
// }));


// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#fff" },
//   },
// });


// function App() {

//   const classes = useStyles()


//   return (
//     <>
//       <ThemeProvider theme={darkTheme}>
//         <BrowserRouter>
//           <div className={classes.App}>
//             <CryptoContext>
//               <Header />


//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/coins/:id" element={<Coins />} />

//               </Routes>
//             </CryptoContext>
//           </div>
//           <Alerts />
//         </BrowserRouter>
//       </ThemeProvider>

//     </>
//   )
// }

// export default App
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Coins from './pages/Coins'
import Header from './components/Header'
import { makeStyles } from "@mui/styles";
import CryptoContext from './CryptoContext'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alerts from './components/Alert'

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    minHeight: "100vh",
    color: "white",
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fff" },
  },
});

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <CryptoContext>
          <div className={classes.App}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins/:id" element={<Coins />} />
            </Routes>
            <Alerts />
          </div>
        </CryptoContext>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

