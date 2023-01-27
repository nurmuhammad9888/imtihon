import { Box, Button, Link, MenuItem, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react';
import plusImg from "../../assets/images/plus-img.svg"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

export const AddAuthor = () => {
    const { t } = useTranslation();
    const first_name  = useRef()
    const last_name  = useRef()
    const date_of_birth  = useRef()
    const date_of_death = useRef()
    const country  = useRef()
    const genre_id  = useRef()
    const bio = useRef()
    const image  = useRef()

    const userData = useSelector(state => state);

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        const newFormData = new FormData();
        newFormData.append('first_name', first_name.current.value);
        newFormData.append('last_name', last_name.current.value);
        newFormData.append('date_of_birth', date_of_birth.current.value);
        newFormData.append('date_of_death', date_of_death.current.value);
        newFormData.append('country', country.current.value);
        newFormData.append('genre_id', genre_id.current.value);
        newFormData.append('bio', bio.current.value);
        newFormData.append('image', image.current.files[0]);

        axios.post("http://localhost:5000/author",newFormData, {headers:{
            "Authorization": userData.user.token
    }})
        .then(res => {
            if(res.status === 201){
                toast.success("Author add success")
            }
            console.log(res)})
        .catch(err => console.log(err))
    }
    return (
        <Box onSubmit={handleSubmit} component={"form"} sx={{display:"flex", backgroundColor:"background.default"}}>
            <Box sx={{maxWidth:"576px",width:"100%", height:"100vh",display:'flex', justifyContent:'center', alignItems:"center"}}>
            <label style={{width:"315px", height:"428px", borderRadius:"17px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", backgroundColor:"#ffffff80", border:"1px dashed rgba(0, 0, 0, 0.3)"}}>
                <img src={plusImg} alt="edit img " />
                <Typography variant='body2' sx={{color:"#00000030", mt:"8px",textAlign:"center",fontSize:"12px",lineHeight:"18px", fontFamily:"inherit"}}>{t("addauthor.title")}</Typography>
                <TextField inputRef={image} sx={{visibility:"hidden", width:"0" ,height:"0"}} name="avatar" id="outlined-basic" type="file" variant="outlined" required/>
            </label>
            </Box>
            <Box sx={{width:"100%", pl:"123px", pt:"48px", backgroundColor:"background.default"}}>
                <Typography variant='h4' component={"h3"} sx={{color:"primary.main", fontSize:"32px",lineHeight:"48px", fontWeight:"600", fontFamily:"inherit"}}>{t("addauthor.title")}</Typography>
                <Box  sx={{marginTop:"12px", maxWidth:"340px"}}>
                    <TextField inputRef={first_name} sx={{maxWidth:"330px" ,color:"primary.main", width:"100%", "& input":{padding:"13px 22px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"button.primary", borderRadius:"10px"}}} id="outlined-basic" type={"text"}placeholder={t("addauthor.fName")} variant="outlined" required/>
                    <TextField inputRef={last_name} sx={{maxWidth:"330px", color:"button.primary" ,marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"button.primary", borderRadius:"10px"}}} id="outlined-basic" type={"text"} placeholder={t("addauthor.lName")} variant="outlined" required/>
                    <TextField inputRef={date_of_birth} sx={{maxWidth:"330px", color:"primary.main", marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"button.primary", borderRadius:"10px"}}} id="outlined-basic" type={"number"} placeholder={t("addauthor.dateOfDirth")} variant="outlined" required/>
                    <TextField inputRef={date_of_death} sx={{maxWidth:"330px" ,color:"primary.main", marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"button.primary", borderRadius:"10px"}}} id="outlined-basic" type={"number"} placeholder={t("addauthor.dateOfDeath")} variant="outlined" required/>
                    <TextField inputRef={country} sx={{maxWidth:"330px", color:"primary.main" ,marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"button.primary", borderRadius:"10px"}}} id="outlined-basic" type={"text"} placeholder={t("addauthor.country")} variant="outlined" required/>
                    <TextField inputRef={genre_id} sx={{maxWidth:"330px" ,color:"primary.main", marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"}, "& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{color:"button.primary", borderRadius:"10px"}}} id="outlined-basic" select label={t("addauthor.genre")} variant="outlined" required>
                        <MenuItem  value={"1"}>
                            Temuriylar davri 
                        </MenuItem>
                        <MenuItem  value={"2"}>
                            Jadid adabiyoti 
                        </MenuItem>
                        <MenuItem  value={"3"}>
                            Sovet davri
                        </MenuItem>
                        <MenuItem  value={"4"}>
                            Mustaqillik davri
                        </MenuItem>
                    </TextField>
                    <TextField inputRef={bio} id="outlined-multiline-static" placeholder='Bio' multiline rows={2.5} sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root":{padding:"13px 22px", borderRadius:"10px"}, "& .css-llfjzw-MuiInputBase-root-MuiOutlinedInput-root":{color:"button.primary",borderRadius:"10px"}}} required/>
                    <Button sx={{marginTop:"39px" ,width:"328px", fontFamily:"inherit", textTransform:"capitalize",textAlign:"center",backgroundColor:"background.profleBtn", "&:hover":{backgroundColor:"#152540"}, borderRadius:"99px", padding:"5px 20px", color:"background.paper", fontSize:"18px", lineHeight:"36px", fontWeight:"500"}} type='submit'>{t("button.create")}</Button>
                </Box>
            </Box>
            <ToastContainer/>
        </Box>
        )
    }
    