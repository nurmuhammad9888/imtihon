import { Button, CssBaseline, Typography } from "@mui/material";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ReactDOM from "react-dom";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

const themeLight = createTheme({
    palette: {
        background: {
            default: "#fff"
        },
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#9e1919",
        },
    }
});

const themeDark = createTheme({
    palette: {
        background: {
            default: "#000"
        },
        primary: {
            main: "#fff",
        },
        secondary: {
            main: "#fafafa",
        },
    }
});

export const Main = () => {
    const [light, setLight] = useState(true);
    return (
        <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <Button onClick={() => setLight(prev => !prev)}>Toggle Theme</Button>
        <Typography color="primary" >hello</Typography>
        <Typography color="primary" >Salom</Typography>
        <Typography color="secondary" >Red</Typography>
        <Typography color="primary" >hello</Typography>
        </ThemeProvider>
        );
    };
    
    