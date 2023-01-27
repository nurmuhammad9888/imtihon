import { Button, Grid, Link, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink as RouterNavlink, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BookCard } from '../BookCard/BookCard';
import { useTranslation } from 'react-i18next';

export const Book = () => {
    const userData = useSelector(state => state);
        const [data, setData] = useState([]);
        const [genres, setGenres] = useState([]);
        const [search, setSearch] = useState([]);
        const book = useRef()
        const { t } = useTranslation();

        const { id } = useParams()

    useEffect(() => {
        axios.get("http://localhost:5000/genre" ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setData(res.data)
    }}).catch(err => console.log(err))
    }, [])


    useEffect(() => {
        axios.get("http://localhost:5000/book/genreId/" + id ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setGenres(res.data)
    }}).catch(err => console.log(err))
    }, [id])

    const handlerChange = (evt) => {
        evt.preventDefault();
        axios.get("http://localhost:5000/book/search?book=" + book.current.value ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        console.log(res)
        if(res.status === 201){
            setSearch(res.data)
    }}).catch(err => console.log(err))
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <Box sx={{borderRadius: "10px", bottom:"19%", left:"6.5%", width:"280px"}}>
                <List sx={{ margin: "0px", display:"inline-block"}}> {dots} </List>
            </Box>
            ),
            customPaging: i => (
                <Box sx={{ width: "57px", height:"3px", background: "rgba(255, 255, 255, 0.6)", borderRadius: "10px"}}>
                </Box>
                )
        };
        return (
            <>
            <Header/>
            <Box>
                <Box sx={{position:"relative",marginBottom:"184px"}}>
                    <Slider {...settings}>
                        <Box className="hero" sx={{width:"100%", height:"346px",borderRadius:"21px",paddingTop:"45px", paddingLeft:"86px"}}>
                            <Typography variant='h4' component={"h1"} sx={{color:"#D1B89D", fontSize:"61px",lineHeight:"67px", fontWeight:"400", fontFamily:"Rotterburg-Display-Font"}}>Temuriylar <br /> davri <br /> adabiyoti</Typography>
                        </Box>
                        <Box className="hero" sx={{width:"100%", height:"346px",borderRadius:"21px",paddingTop:"45px", paddingLeft:"86px"}}>
                            <Typography variant='h4' sx={{color:"#D1B89D", fontSize:"61px",lineHeight:"67px", fontWeight:"400", fontFamily:"Rotterburg-Display-Font"}}>Jadid <br /> davri <br /> adabiyoti</Typography>
                        </Box>
                        <Box className="hero" sx={{width:"100%", height:"346px",borderRadius:"21px",paddingTop:"45px", paddingLeft:"86px"}}>
                            <Typography variant='h4' sx={{color:"#D1B89D", fontSize:"61px",lineHeight:"67px", fontWeight:"400", fontFamily:"Rotterburg-Display-Font"}}>Sovet <br /> davri <br /> adabiyoti</Typography>
                        </Box>
                        <Box className="hero" sx={{width:"100%", height:"346px",borderRadius:"21px",paddingTop:"45px", paddingLeft:"86px"}}>
                            <Typography variant='h4' sx={{color:"#D1B89D", fontSize:"61px",lineHeight:"67px", fontWeight:"400", fontFamily:"Rotterburg-Display-Font"}}>Mustaqillik <br /> davri <br /> adabiyoti</Typography>
                        </Box>
                    </Slider>
                    <Box sx={{position:"absolute", bottom:"-25%",left:"9%", width:"100%",maxWidth:"1030px",mx:"auto", padding:"29px 73px", backgroundColor:"background.default", borderRadius:"15px",boxShadow:"0px 4px 77px rgba(0, 0, 0, 0.25)"}}>
                        <Typography sx={{textAlign:"center", fontWeight:"400", fontSize:"32px", fontFamily:"inherit", color:"#D1B89D"}} variant='h4'>{t("search.search")}</Typography>
                        <Box onSubmit={handlerChange} component="form"sx={{marginTop:"9px"}}>
                            <TextField inputRef={book} sx={{maxWidth:"710px", width:"100%", backgroundColor:"background.form",borderRadius:"15px", "& input":{padding:"12px 27px", borderRadius:"15px"}, "& fieldset":{borderRadius:"15px", border:"none"}}} type="search" id="outlined-basic" placeholder={t("search.searchInputPlaceholder")} variant="outlined" />
                            <Button startIcon={<SearchIcon/>} sx={{marginLeft:"14px",backgroundColor:"#C9AC8C", fontWeight:"400", fontFamily:"inherit", padding:"12px 42px",color:"text.btn", textTransform:"capitalize",borderRadius:"15px","&:hover":{backgroundColor:"#C9AC8C"}}} variant='text' type='submit'>{t("search.searchv2")}</Button>
                        </Box>
                    </Box>
                </Box>

            {search?.length ? ( 
                <>
                    <Typography sx={{textAlign:"center", fontWeight:"400", fontSize:"32px", fontFamily:"inherit", color:"#D1B89D"}} variant='h4'>{t("search.search")}</Typography>
                    <Grid sx={{marginTop:"4px"}} container spacing={2}>
                        {search.map(el => (
                            <Grid sx={{marginTop:"8px"}} item xs={2}>
                            <Link sx={{textDecoration:"none"}} to={`/bookpage/${el.id}`} component={RouterNavlink}>
                                <Box sx={{borderRadius:"22px", width:"190px", height:"382px"}}>
                                    <img style={{borderRadius:"22px 22px 0px 0px", width:"190px", height:"283px"}} src={`http://localhost:5000/${el.image}`} width={190} height={283} alt="" />
                                    <Box sx={{padding:"12px 16px"}}>
                                        <Typography sx={{color:"#000000", fontSize:"16px",lineHeight:"27px", fontWeight:"500", fontFamily:"inherit"}} variant='h5'>{el.title}</Typography>
                                        {/* <Typography sx={{color:"rgba(0, 0, 0, 0.6)", fontSize:"16px", fontFamily:"inherit", marginTop:"6px"}} variant='body2'>{genres.first_name} {genres.last_name }</Typography> */}
                                    </Box>
                                </Box>
                            </Link>
                        </Grid>
                        ))}
                    </Grid>
                </>
            ) : ""}

                <Box sx={{width:"100%", marginTop:"4px"}}>
                    <Typography sx={{textAlign:"center", fontWeight:"400", fontSize:"32px", fontFamily:"inherit", color:"#C9AC8C"}} variant='h5'component={"h2"}>{t("ganres.title")}</Typography>
                    <List sx={{maxWidth:"755px", width:"100%", mx:"auto", display:"flex", alignItems:"center",marginTop:"12px"}}>
                        {data.map(el => (
                            <ListItem key={el.id} sx={{width:"auto", padding:"10px",marginLeft:"34px",'&:nth-child(1)': {marginLeft:"0"},}}>
                                <Link sx={{textDecoration:"none",fontSize:"18px", color:"text.disabled", '&.active': {color: '#C9AC8C'}}} to={`/book/${el.id}`} component={RouterNavlink}>{el.name}</Link>
                            </ListItem>
                        ))}
                        {/* <ListItem sx={{width:"auto", padding:"10px", marginLeft:"34px"}}>
                            <Link sx={{textDecoration:"none",fontSize:"18px", color:"rgba(13, 13, 13, 0.6)", '&.active': {color: '#C9AC8C'}}} to="/jadid/2" component={RouterNavlink}>Jadid adabiyoti </Link>
                        </ListItem>
                        <ListItem sx={{width:"auto", padding:"10px", marginLeft:"34px"}}>
                            <Link sx={{textDecoration:"none",fontSize:"18px", color:"rgba(13, 13, 13, 0.6)", '&.active': {color: '#C9AC8C'}}} to="/sovet/3" component={RouterNavlink}>Sovet davri </Link>
                        </ListItem>
                        <ListItem sx={{width:"auto", padding:"10px", marginLeft:"34px"}}>
                            <Link sx={{textDecoration:"none",fontSize:"18px", color:"rgba(13, 13, 13, 0.6)", '&.active': {color: '#C9AC8C'}}} to="/mustaqillik/4" component={RouterNavlink}>Mustaqillik davri</Link>
                        </ListItem> */}
                    </List>
                {genres?.length ? (
                    <Grid sx={{marginTop:"14px", marginBottom:"138px"}} container spacing={2}>
                        {genres.map(item => (
                            <BookCard key={item.id} item={item}/>
                        ))}
                    </Grid>
                ) : ("Not found")}
                </Box>
            </Box>
            </>
            );
        };
        