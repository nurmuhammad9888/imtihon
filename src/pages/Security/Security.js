import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

export const Security = () => {
    const userData = useSelector(state => state.user);
    const { t } = useTranslation();

    const email = useRef()
    const currentPassword = useRef()
    const newPassword = useRef()

    const handlerUserSecurity = (evt) => {
        evt.preventDefault();

        console.log(email.current.value);
        console.log(currentPassword.current.value);
        console.log(newPassword.current.value);
        
        axios.put("http://localhost:5000/user/security", {
            'email': email.current.value,
            'currentPassword': currentPassword.current.value,
            'newPassword': newPassword.current.value
        } ,
        {headers:{"Authorization": userData.token}}).then(res => {
            if(res.status === 201){
                toast.success("New password success")
            }
            console.log(res)
        }).catch(err => console.log(err))
    }
    return (
        <>
            <Box sx={{width:"708px", ml:"248px", mt:"83px"}}>
                <Typography sx={{fontWeight:"500", fontSize:"18px", fontFamily:"inherit", color:"text.secondary"}} variant='body2'>{t("security.title")}</Typography>
                <Box onSubmit={handlerUserSecurity} component={"form"} sx={{mt:"32px"}}>
                    <InputLabel sx={{color:"inputColor", mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="email">
                    {t("security.email")}
                    </InputLabel>
                    <TextField inputRef={email} sx={{maxWidth:"708px", mb:"3px",width:"100%", "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, backgroundColor:"#F3F6F9","& input":{padding:"12px 20px"},"& fieldset":{borderRadius:"4px", border:"none"}}} id="email" type={"email"} placeholder='Email' defaultValue={userData.user.email} variant="outlined" />
                    <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"#B5B5C380"}} variant='subtitle2'>{t("security.emailDesc")}</Typography>
                    <InputLabel sx={{color:"inputColor", mt:"22px",mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="currentPassword">
                    {t("security.password")}
                    </InputLabel>
                    <TextField inputRef={currentPassword} sx={{maxWidth:"708px", mb:"3px",width:"100%", "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, backgroundColor:"#F3F6F9","& input":{padding:"12px 20px"},"& fieldset":{borderRadius:"4px", border:"none"}}} id="currentPassword" type={"password"} placeholder={t("security.passwordPlaceholder")} variant="outlined" />
                    <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"#B5B5C380"}} variant='subtitle2'>{t("security.passwordDesc")}</Typography>
                    <InputLabel sx={{color:"inputColor", mt:"16px",mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="newPassword">
                    {t("security.newPassword")}
                    </InputLabel>
                    <TextField inputRef={newPassword} sx={{maxWidth:"708px", mb:"3px",width:"100%", "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, backgroundColor:"#F3F6F9","& input":{padding:"12px 20px"},"& fieldset":{borderRadius:"4px", border:"none"}}} id="newPassword" type={"password"} placeholder={t("security.newPasswordPlaceHolder")} variant="outlined" />
                    <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"#B5B5C380"}} variant='subtitle2'>{t("security.newPasswordDesc")}</Typography>
                    <Box sx={{display:"flex", justifyContent:"right", mt:"89px"}}>
                        <Button sx={{padding:"12px 20px 11px 26px", backgroundColor:"background.profleBtn", borderRadius:"4px", fontSize:"13px", fontWeight:"600", color:"background.paper", fontFamily:"inherit", textTransform:"capitalize",  "&:hover":{backgroundColor:"#152540"}}} type='submit'>{t("button.saveChange")}</Button>
                    </Box>
                </Box>
            </Box>
            <ToastContainer/>
        </>
        )
    }
    