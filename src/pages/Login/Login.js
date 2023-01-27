import { Box, Button, Link, TextField, Typography } from '@mui/material'
import React from 'react';
import { NavLink as RouterNavlink, useNavigate } from 'react-router-dom';
import loginImg from "../../assets/images/loginbg.png"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveToken } from '../Register/UserAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';


export const Login = () => {
    const {register, formState:{errors, isValid,}, handleSubmit}= useForm({
        mode:"all"
    })
    const navgate = useNavigate()
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onSubmit = (data) =>{
        axios.post("http://localhost:5000/user/login", data)
        .then(res => {
            if(res.status === 201){
                dispatch(saveToken(res.data.token, localStorage.setItem("token", res.data.token)))
                navgate("/")
            }
            console.log(res)})
            .catch(err => {
                if(err.response.data.message === "User is not found"){
                    toast.error("Password or email error")
                }
                console.log(err);
            })
    }
    return (
        <>
        <Box sx={{display:"flex"}}>
            <Box sx={{maxWidth:"576px", height:"100vh",width:"100%", background:"rgba(201, 172, 140, 0.93)", padding:"100px 40px"}}>
                <img src={loginImg} alt="login img" />
            </Box>
            <Box sx={{width:"100%", ml:"135px", mt:"191px"}}>
                <Typography variant='h4' component={"h3"} sx={{color:"primary.main", fontSize:"36px",lineHeight:"51px", fontWeight:"900", fontFamily:"inherit"}}>{t("login.title")}</Typography>
                <Box sx={{display:"flex", alignItems:"center", marginTop:"10px"}}>
                <Typography variant='body2' sx={{color:"primary.main", fontSize:"13px", fontFamily:"inherit"}}>{t("login.quation")} </Typography>
                    <Link sx={{color:"#549FF9", fontSize:"13px", fontFamily:"inherit", marginLeft:"8px", textDecoration:"none"}} to="/register" component={RouterNavlink}>{t("login.quationLink")}</Link>
                </Box>
                <Box onSubmit={handleSubmit(onSubmit)} component={"form"} sx={{marginTop:"21px", maxWidth:"340px"}}>
                    <TextField sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"16px 29px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"},"& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px"}}} id="outlined-basic" type={"email"} helperText={errors.email?.message}  {...register("email",{required:"Requirede"})} placeholder={t("login.email")} variant="outlined" />
                    <TextField sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"16px 29px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"},"& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px"}}} id="outlined-basic" type={"password"}  helperText={errors.password?.message}  {...register("password",{required:"Requirede", minLength:{value: 3, message:"3 ta"}, maxLength:{value: 8, message:"8 ta"}})} placeholder={t("login.password")} variant="outlined" />
                    <Button disabled={!isValid} sx={{marginTop:"39px" ,width:"328px", fontFamily:"inherit", textTransform:"capitalize",textAlign:"center",backgroundColor:"background.profleBtn", "&:hover":{backgroundColor:"#152540"}, borderRadius:"99px", padding:"5px 20px", color:"background.paper", fontSize:"18px", lineHeight:"36px", fontWeight:"500"}} type='submit'>{t("button.nextStep")}</Button>
                </Box>
            </Box>
        </Box>
        <ToastContainer/>
        </>
        )
    }
    