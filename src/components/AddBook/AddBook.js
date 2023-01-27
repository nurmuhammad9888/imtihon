import { Box, Button, Link, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
import plusImg from "../../assets/images/plus-img.svg"
import { useForm } from 'react-hook-form';
import axios, { AxiosHeaders } from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

export const AddBook = () => {
    const userData = useSelector(state => state);
    const [change, setChgange] = useState(0);
    const [genres, setGenres] = useState([]);
    const { t } = useTranslation();

    const title = useRef()
    const page = useRef()
    const year = useRef()
    const price = useRef()
    const genre = useRef()
    const author = useRef()
    const bio = useRef()
    const img = useRef()

    useEffect(() => {
        axios.get("http://localhost:5000/author/genreId/" + change ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            console.log(res)
            setGenres(res.data)
    }}).catch(err => console.log(err))
    }, [change])

    const handleSubmit = (evt) =>{
        evt.preventDefault();

        const newFormData = new FormData();
        newFormData.append('title', title.current.value);
        newFormData.append('page', page.current.value);
        newFormData.append('year', year.current.value);
        newFormData.append('price', price.current.value);
        newFormData.append('genre_id', genre.current.value);
        newFormData.append('author_id', author.current.value);
        newFormData.append('description', bio.current.value);
        newFormData.append('image', img.current.files[0]);

    axios.post("http://localhost:5000/book", newFormData, {headers:{
            "Authorization": userData.user.token
    }})
        .then(res => {
            console.log(res)
            if(res.status === 201){
                toast.success("Book add success")
            }})
        .catch(err => console.log(err))
    }
    return (
        <Box onSubmit={handleSubmit} component={"form"} sx={{display:"flex", backgroundColor:"background.default"}}>
            <Box sx={{width:"100%", height:"100vh",display:'flex', justifyContent:'center', alignItems:"center"}}>
            <label style={{width:"315px", height:"428px", borderRadius:"17px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column",backgroundColor:"#ffffff80", border:"1px dashed rgba(0, 0, 0, 0.3)"}}>
                <img src={plusImg} alt="edit img " />
                <Typography variant='body2' sx={{color:"#00000030", mt:"8px",textAlign:"center",fontSize:"12px",lineHeight:"18px", fontFamily:"inherit"}}>{t("addBook.imgDesc")}</Typography>
                <TextField inputRef={img} sx={{visibility:"hidden", width:"0" ,height:"0"}} id="outlined-basic" type="file" variant="outlined" required/>
            </label>
            </Box>
            <Box sx={{width:"100%", pl:"123px", pt:"48px", backgroundColor:"background.default"}}>
                <Typography variant='h4' component={"h3"} sx={{color:"primary.main", fontSize:"32px",lineHeight:"48px", fontWeight:"600", fontFamily:"inherit"}}>{t("addBook.title")}</Typography>
                <Box  sx={{marginTop:"12px", maxWidth:"340px"}}>
                    <TextField inputRef={title} sx={{maxWidth:"330px", width:"100%", "& input":{padding:"13px 22px"},"& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px", color:"button.primary"}}} id="outlined-basic" type={"text"}placeholder={t("addBook.titleInput")} variant="outlined" required/>
                    <TextField inputRef={page} sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"},"& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px", color:"button.primary"}}} id="outlined-basic" type={"number"} placeholder={t("addBook.pagesInput")} variant="outlined" required/>
                    <TextField inputRef={year} sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"},"& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px", color:"button.primary"}}} id="outlined-basic" type={"number"} placeholder={t("addBook.yearInput")} variant="outlined" required/>
                    <TextField inputRef={price} sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"},"& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px", color:"button.primary"}}} id="outlined-basic" type={"number"} placeholder={t("addBook.priceInput")} variant="outlined" required/>
                    <TextField inputRef={genre} onChange={(evt) => setChgange(evt.target.value)} sx={{maxWidth:"330px", marginTop:"16px",width:"100%","& input":{padding:"13px 22px"},"& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px", color:"button.primary"}}} id="outlined-basic" select  label={t("addBook.genre")} variant="outlined" required>
                        <MenuItem  value={1}>
                            Temuriylar davri 
                        </MenuItem>
                        <MenuItem  value={2}>
                            Jadid adabiyoti 
                        </MenuItem>
                        <MenuItem  value={3}>
                            Sovet davri
                        </MenuItem>
                        <MenuItem  value={4}>
                            Mustaqillik davri
                        </MenuItem>
                    </TextField>
                    <TextField inputRef={author} sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& input":{padding:"13px 22px"},"& .css-1qt2jsy-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px", color:"button.primary"}}} label={t("addBook.author")} id="outlined-basic" select variant="outlined" required>
                    {genres?.length ?  genres.map(item => (
                            <MenuItem key={item.id}  value={item.id}>
                                {item.first_name + " " + item.last_name}
                            </MenuItem>
                        )) : <MenuItem disabled>
                        Not found
                        </MenuItem>}
                    </TextField>
                    <TextField inputRef={bio} id="outlined-multiline-static" placeholder='Bio' multiline rows={2.5} sx={{maxWidth:"330px", marginTop:"16px",width:"100%", "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root":{padding:"13px 22px", borderRadius:"10px"},"& .css-llfjzw-MuiInputBase-root-MuiOutlinedInput-root":{borderRadius:"10px", color:"button.primary"}}} required/>
                    <Button sx={{marginTop:"39px" ,width:"328px", fontFamily:"inherit", textTransform:"capitalize",textAlign:"center",backgroundColor:"background.profleBtn", "&:hover":{backgroundColor:"#152540"}, borderRadius:"99px", padding:"5px 20px", color:"background.paper", fontSize:"18px", lineHeight:"36px", fontWeight:"500"}} type='submit'>{t("button.create")}</Button>
                </Box>
            </Box>
            <ToastContainer/>
        </Box>
        )
    }
    