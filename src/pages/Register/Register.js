import { Box, Button, Link, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react';
import { NavLink as RouterNavlink, useNavigate } from 'react-router-dom';
import registerImg from "../../assets/images/register-bg.png"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveToken } from './UserAction';
import { useTranslation } from 'react-i18next';

export const Register = () => {
    const {register, formState:{errors, isValid,}, handleSubmit}= useForm({
        mode:"all"
    })
    const navgate = useNavigate()
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onSubmit = (data) =>{
        axios.post("http://localhost:5000/user/register", data)
        .then(res => {
            if(res.status === 201){
                dispatch(saveToken(res.data.token, localStorage.setItem("token", res.data.token)))
                navgate("/")
            }
            console.log(res)})
        .catch(err => console.log(err))

        console.log(data);
    }
    return (
        <Box sx={{display:"flex"}}>
            <Box sx={{maxWidth:"576px", height:"100vh",width:"100%", background:"rgba(201, 172, 140, 0.93)", padding:"100px 38px"}}>
                <img src={registerImg} alt="" />
            </Box>
            <Box sx={{width:"100%", ml:"108px", mt:"75px"}}>
                <Typography variant='h4' component={"h3"} sx={{color:"primary.main", fontSize:"36px",lineHeight:"51px", fontWeight:"900", fontFamily:"inherit"}}>{t("register.title")}</Typography>
                <Box sx={{display:"flex", alignItems:"center", marginTop:"10px"}}>
                <Typography variant='body2' sx={{color:"primary.main", fontSize:"13px", fontFamily:"inherit"}}>{t("register.quation")}</Typography>
                    <Link sx={{color:"#549FF9", fontSize:"13px", fontFamily:"inherit", marginLeft:"8px", textDecoration:"none"}} to="/login" component={RouterNavlink}>{t("register.quationLink")}</Link>
                </Box>
                <Box onSubmit={handleSubmit(onSubmit)} component={"form"} sx={{marginTop:"21px", maxWidth:"340px"}}>
                    <TextField sx={{maxWidth:"330px", width:"100%", "& input":{padding:"16px 29px"},"& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}}} id="outlined-basic" type={"text"} helperText={errors.first_name?.message}  {...register("first_name",{required:"Requirede"})}placeholder={t("register.fName")} variant="outlined" />
                    <TextField sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"16px 29px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px"}}} id="outlined-basic" type={"text"} helperText={errors.last_name?.message}  {...register("last_name",{required:"Requirede"})} placeholder={t("register.lName")} variant="outlined" />
                    <TextField sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"16px 29px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px"}}} id="outlined-basic" type={"tel"} helperText={errors.phone?.message}  {...register("phone",{required:"Requirede"})} placeholder={t("register.phone")} variant="outlined" />
                    <TextField sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"16px 29px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px"}}} id="outlined-basic" type={"email"} helperText={errors.email?.message}  {...register("email",{required:"Requirede"})} placeholder={t("register.email")} variant="outlined" />
                    <TextField sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"16px 29px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"text.input"}, "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px"}}} id="outlined-basic" type={"password"}  helperText={errors.password?.message}  {...register("password",{required:"Requirede", minLength:{value: 3, message:"3 ta"}, maxLength:{value: 8, message:"8 ta"}})} placeholder={t("register.password")} variant="outlined" />
                    <Button disabled={!isValid} sx={{marginTop:"39px" ,width:"328px", fontFamily:"inherit", textTransform:"capitalize",textAlign:"center",backgroundColor:"background.profleBtn", "&:hover":{backgroundColor:"#152540"}, borderRadius:"99px", padding:"5px 20px", color:"background.paper", fontSize:"18px", lineHeight:"36px", fontWeight:"500"}} type='submit'>{t("button.nextStep")}</Button>
                </Box>
            </Box>
        </Box>
        )
    }
    