import { Button, InputLabel, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useRef } from 'react'
import cameraImg from "../../assets/images/camera.svg"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';


export const Profile = () => {
    const userData = useSelector(state => state.user);
    const { t } = useTranslation();

    const first_name = useRef()
    const last_name = useRef()
    const phone = useRef()
    const image = useRef()

    const handlerUserPut = (evt) => {
        evt.preventDefault();

        const newFormData = new FormData();
        newFormData.append('first_name', first_name.current.value);
        newFormData.append('last_name', last_name.current.value);
        newFormData.append('phone', phone.current.value);
        newFormData.append('image', image.current.files[0]);

        axios.put("http://localhost:5000/user/account", newFormData ,
        {headers:{"Authorization": userData.token}}).then(res => {
            if(res.status === 201){
                toast.success("Update profile success")
            }
        console.log(res)
        }).catch(err => console.log(err))
    }
    return (
        <>
            <Box sx={{display:"flex", mt:"83px"}}>
                <Box sx={{width:"174px", height:"174px"}}>
                    <label style={{borderRadius:"50%", cursor:"pointer",backgroundColor:"#F8F8F8", position:"relative"}}>
                    {userData.user.image !== null ? (
                        <img src={`http://localhost:5000/${userData.user.image}`} width={175} height={175} style={{width:"175px" , height:"175px", borderRadius:"50%"}} alt="edit img "/>
                                ) : (
                                    <Box sx={{width:"175px", fontSize:"35px", justifyContent:"center",color:"text.input",alignItems:"center",display:"flex",height:"175px", borderRadius:"50%", backgroundColor:"#F8F8F8"}}>{userData.user.last_name.charAt(0) + userData.user.first_name.charAt(0)}</Box>
                                )}
                        <TextField inputRef={image} sx={{visibility:"hidden", width:"0" ,height:"0"}} id="outlined-basicc" type="file" variant="outlined" required/>
                        <Box sx={{position:"absolute",bottom:"10px", left:"115px",backgroundColor:"#F3F6F9", borderRadius:"8px", padding:"12px 9px", filter:"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}}>
                            <img src={cameraImg} width={33} height={25} alt="camera" />
                        </Box>
                    </label>
                </Box>
                <Box sx={{width:"708px", ml:"110px"}}>
                    <Typography sx={{fontWeight:"500", fontSize:"18px", fontFamily:"inherit", color:"text.secondary"}} variant='body2'>{t("profile.myProfile")}</Typography>
                    <Box onSubmit={handlerUserPut} component={"form"} sx={{mt:"32px"}}>
                        <InputLabel sx={{color:"inputColor", mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="firstName">
                        {t("profile.fName")}
                        </InputLabel>
                        <TextField inputRef={first_name} sx={{maxWidth:"708px", "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, mb:"3px",width:"100%", backgroundColor:"#F3F6F9","& input":{padding:"12px 20px"},"& fieldset":{borderRadius:"4px", border:"none"}}} id="firstName" type={"text"} placeholder={t("profile.fNameInputPlaceholder")} defaultValue={userData.user.first_name} variant="outlined" required/>
                        <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"#B5B5C380"}} variant='subtitle2'>{t("profile.fNameInputText")}</Typography>
                        <InputLabel sx={{color:"inputColor", mt:"22px",mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="lastName">
                        {t("profile.lName")}
                        </InputLabel>
                        <TextField inputRef={last_name} sx={{maxWidth:"708px", "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, mb:"3px",width:"100%", backgroundColor:"#F3F6F9","& input":{padding:"12px 20px"},"& fieldset":{borderRadius:"4px", border:"none"}}} id="lastName" type={"text"} placeholder={t("profile.lNameInputPlaceholder")} defaultValue={userData.user.last_name} variant="outlined" required/>
                        <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"#B5B5C380"}} variant='subtitle2'>{t("profile.lNameInputText")}</Typography>
                        <InputLabel sx={{color:"inputColor", mt:"16px",mb:"7px", fontSize:"13px", fontFamily:"inherit"}} htmlFor="phone">
                        {t("profile.phoneText")}
                        </InputLabel>
                        <TextField inputRef={phone} sx={{maxWidth:"340px", "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, mb:"3px",width:"100%", backgroundColor:"#F3F6F9","& input":{padding:"12px 20px"},"& fieldset":{borderRadius:"4px", border:"none"}}} id="phone" type={"tel"} placeholder='Phone' defaultValue={userData.user.phone} variant="outlined" required/>
                        <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"#B5B5C380"}} variant='subtitle2'>{t("profile.phoneDesc")}</Typography>
                        <Typography variant='subtitle2' sx={{width:"100%", height:"2px", mt:"26px",backgroundColor:"#ECF0F3"}}></Typography>
                        <Box sx={{display:"flex", justifyContent:"right", mt:"44px"}}>
                            <Button sx={{padding:"12px 20px 11px 26px", backgroundColor:"background.profleBtn", borderRadius:"4px", fontSize:"13px", fontWeight:"600", color:"background.paper", fontFamily:"inherit", textTransform:"capitalize",  "&:hover":{backgroundColor:"#152540"}}} type='submit'>{t("button.saveChange")}</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ToastContainer/>
        </>
        )
    }
    