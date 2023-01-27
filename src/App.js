import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AddAuthor } from "./components/AddAuthor/AddAuthor";
import { AddBook } from "./components/AddBook/AddBook";
import { Profile } from "./components/Profile/Profile";
import { ProfileHaeder } from "./components/ProfileHeader/ProfileHaeder";
import "./main.css"
import { AuthorPage } from "./pages/AuthorPage/AuthorPage";
import { Book } from "./pages/Book/Book";
import { BookPage } from "./pages/BookPage/BookPage";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Security } from "./pages/Security/Security";
import { Settings } from "./pages/Settings/Settings";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState } from "react";
import { CssBaseline, Paper } from "@mui/material";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { lang } from "./Lang/Lang";

function App() {
  const state = useSelector((state) => state.user);
  // const [mode, stMode] = useState(true)
  

  i18n.use(initReactI18next).init({
    fallbackLng: localStorage.getItem("lang") || "uz",
    interpolation: {
        escapeValue: false,
    },

    resources: {
        en: { translation: lang.en },
        uz: { translation: lang.uz },
        ru: { translation: lang.ru },
    }
});

// const theme = useSelector((state) => state.user.theme);
const theme = localStorage.getItem("theme") || "light"
// const theme = "light";

console.log(theme);

const getdesignTokens = (mode) => ({
    palette:{
      mode,
      primary:{
        ...(mode === "dark" && {
          main:"#fff",
        }),
        ...(mode === "light" && {
          main:"#000",
        }),
      },
      ...(mode === "dark" && {
        background:{
          default:"#191919",
          paper:"#191919",
          form:"#404040",
          card_color:"#C9AC8C",
          addBook:"#1B1B1B",
          navActive:"#F3F6F9",
          profile:"#000",
          placolor:"#000",
          profleBtn:"#F1F6FF",
          nav:"#2D2D2D",
          imgColor:"#4D4D4D",
        },
      }),
      ...(mode === "light" && {
        background:{
          default:"#fff",
          paper:"#fff",
          form:"#F5F5F5",
          card_color:"#000000",
          addBook:"#F3F3F3ed",
          navActive:"#DDE6F5",
          profile:"#152540",
          profleBtn:"#152540",
          placolor:"#000",
          nav:"#F3F6F9",
          imgColor:"#F8F8F8",
        },
      }),
      text:{
        ...(mode === "light" ? {
          primary:"#0D0D0D",
          secondary:"#000",
          card_title:"#000",
          disabled:"#B6B6B6",
          btn:"#FFF",
          orange:"#000000",
          white:"#000",
          inputColor:"#464E5F",
          input:"#fff"
        } : { 
          primary:"#FFFFFF90",
          secondary:"#fff",
          card_title:"#C9AC8C",
          disabled:"#5E5E5E",
          btn:"#3C2710",
          orange:"#C9AC8C",
          white:"#FFF",
          inputColor:"#fff",
          input:"#000"
        }),
      },
      button:{
        ...(mode === "light" ? {
          primary:"#AAAAAA"
        } :{
          primary:"#FFFFFF",
        }),
      },
      link:{
        ...(mode === "light" ? {
          primary:"#0d0d0d99",
        } :{
          primary:"#ffffff99"
        }),
      },
    },
});
const darkModeTheme = createTheme(getdesignTokens(theme),)

  if (state.token) {
    return (
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline />
        <Paper sx={{
          // display:"flex",
          // width:"100%",
          // alignItems:"center",
          // justifyContent:"center",
          bgcolor:"background.default",
          color:"text.primary",
          boxShadow:"0"
        }}>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace={true} />} />
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/home" element={<Navigate to="/home/1" replace={true} />} />
            <Route path="/home/*" element={<Home/>}></Route>
            <Route path="home/:id" element={<Home/>}/>

            <Route path="/book" element={<Navigate to="/book/1" replace={true} />} />
            <Route path="/book/*" element={<Book/>}/>
            <Route path="book/:id" element={<Book/>}/>
            <Route path="/bookpage/:id" element={<BookPage/>}/>
            <Route path="/profile/*" element={<ProfileHaeder/>}>
              <Route index element={<Profile/>}/>
              <Route path="security" element={<Security/>}/>
              <Route path="settings" element={<Settings/>}/>
            </Route>            
            <Route path="/page/:id" element={<AuthorPage/>}/>
            <Route path="/addbook" element={<AddBook/>}/>
            <Route path="/addauthor" element={<AddAuthor/>}/>
          </Routes>
          </Paper>
      </ThemeProvider>
  )
  }else{
    return (
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline />
        <Paper sx={{
          // display:"flex",
          // width:"100%",
          // alignItems:"center",
          // justifyContent:"center",
          bgcolor:"background.default",
          color:"text.primary",
          boxShadow:"0"
        }}>
        <Routes> 
              <Route path="*" element={<Navigate to="/register" replace={true} />} />
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
        </Routes> 
        </Paper>
    </ThemeProvider>
    )
  }
}

export default App;
