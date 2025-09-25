import { makeStyles } from "@mui/styles"
import Container from "@mui/material/Container";
import React from "react"
import { Typography } from "@mui/material";
import Carousel from "./Carousel";
const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner2.jpg)"
    },
    bannerContent: {
        height: 300,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
        // alignItems: "center",
        // justifyContent: "center",

    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"

    }
}))
const Banner = () => {
    const classes = useStyles()
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant="h3" style={{ color: "#1e90ff", fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat" }}>
                        Crypto Tracker
                    </Typography>
                    <Typography variant="subtitle2" style={{ color: "#87ceeb", textTransform: "capitalize", fontFamily: "Montserrat" }}>
                        Get all the latest crypto updates in one place
                    </Typography>

                </div>
                <Carousel />
            </Container>

        </div>

    )
}
export default Banner