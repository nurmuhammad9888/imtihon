import { Box, Button, InputLabel, MenuItem, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { theme } from '../Register/UserAction';

export const Settings = () => {
    // const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const [themes, setThemes] = useState("light")


    const handlerSubmit = (evt) => {
        evt.preventDefault()
        
    }
    const handlerLang = (evt) => {
        i18n.changeLanguage(evt.target.value); 
        localStorage.setItem("lang", evt.target.value); 
        console.log(evt.target.value)
    }

    const hamdlerChange = () =>{
        dispatch(theme(themes))
        localStorage.setItem("theme", themes)
        if(themes === "dark"){
            setThemes("light")
            localStorage.setItem("themeCheck", JSON.stringify(true))
        }else{
            setThemes("dark")
            localStorage.setItem("themeCheck", JSON.stringify(false))
        }
    }
    
    const themeCheck = JSON.parse(localStorage.getItem("themeCheck")) 
    // console.log(themeCheck);

    return (
        <>
            <Box sx={{ pl:"244px", pt:"154px"}}>
                <Typography sx={{fontWeight:"500", fontSize:"18px", fontFamily:"inherit", color:"text.secondary"}} variant='body2'>{t("settings.title")}</Typography>
                <Box component={"form"} onSubmit={handlerSubmit} sx={{mt:"32px", width:"708px",}}>
                    <InputLabel sx={{color:"inputColor", mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="language">
                    {t("settings.selectTitle")}
                    </InputLabel>
                    <TextField defaultValue={i18n.language} onChange={handlerLang} sx={{maxWidth:"708px", mb:"3px",width:"100%",color:"secondary" ,backgroundColor:"#F3F6F9", "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, "& input":{padding:"12px 20px"},"& fieldset":{borderRadius:"4px", border:"none"}}} id="language" type={"text"} placeholder='Language' select  variant="outlined" >
                        <MenuItem  value={"en"}>
                            English
                        </MenuItem>
                        <MenuItem  value={"ru"}>
                            Russian
                        </MenuItem>
                        <MenuItem  value={"uz"}>
                            Uzbek
                        </MenuItem>
                    </TextField>
                    <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"#B5B5C380"}} variant='subtitle2'>{t("settings.selectDesc")}</Typography>
                    <InputLabel sx={{color:"inputColor", mt:"22px",mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="lastName">
                    {t("settings.theme")}
                    </InputLabel>
                    <Switch 
                    checked={themeCheck}
                    onChange={hamdlerChange} sx={{width:"87px", height:"33px", padding:"0",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius:"23px","& .css-jsexje-MuiSwitch-thumb":{width:"28px", height:"28px"}, 
                    "& .css-1yjjitx-MuiSwitch-track":{borderRadius:"14px",backgroundColor:"#F3F6F9"}, "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase":{color:"#3699FF",padding:"0", top:"2px", left:"3px"},"& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked":{transform: "translateX(54px)"}, "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":{backgroundColor:"#F3F6F9"}}} />
                    <Typography variant='subtitle2' sx={{width:"100%", height:"2px", mt:"40px",backgroundColor:"#ECF0F3"}}></Typography>
                    <Box sx={{display:"flex", justifyContent:"right", mt:"32px"}}>
                        <Button sx={{padding:"12px 20px 11px 26px", backgroundColor:"background.profleBtn", borderRadius:"4px", fontSize:"13px", fontWeight:"600", color:"background.paper", fontFamily:"inherit", textTransform:"capitalize",  "&:hover":{backgroundColor:"#152540"}}} type='submit'>{t("button.saveChange")}</Button>
                    </Box>
                </Box>
            </Box>
        </>
        )
    }
    