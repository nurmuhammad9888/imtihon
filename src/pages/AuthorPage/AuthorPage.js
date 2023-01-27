import { Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import saerchImg from "../../assets/images/o'tkirhoshemov.jpg";
import { NavLink as RouterNavlink } from 'react-router-dom';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';


export const AuthorPage = () => {
    const userData = useSelector(state => state);
    const { id } = useParams()
    const [author, setAuthor] = useState([]);
    const [books, setBooks] = useState([]);
    const { t } = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        
    };

    useEffect(() => {
        axios.get("http://localhost:5000/author/authorId/" + id ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setAuthor(res.data)
    }}).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/author/books/" + id ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setBooks(res.data)
    }}).catch(err => console.log(err))
    }, [])

    return (
        <>
        <Header/>
            <Box sx={{display:"flex", mt:"47px"}}>
                    <Box sx={{width:"505px", height:"681px", borderRadius:"20px"}}>
                        <img src={`http://localhost:5000/${author.image}`} style={{width:"505px", height:"681px", borderRadius:"20px"}} width={505} height={681} alt="" />
                    </Box>
                    <Box sx={{ml:"64px"}}>
                        <Typography variant='h4' component={"h2"} sx={{color:"#D1B89D", fontSize:"48px",lineHeight:"72px", fontWeight:"400", fontFamily:"inherit"}}>{author.first_name} {author.last_name}</Typography>
                        <Typography variant='body2' sx={{color:"text.white", fontSize:"16px",lineHeight:"24px", fontWeight:"400", fontFamily:"inherit"}}>
                            {author.bio}
                        </Typography>
                        <Box sx={{display:"flex", alignItems:"center", mt:"44px"}}>
                            <Box>
                                <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"text.disabled"}} variant='body2'>Tavallud sanasi</Typography>
                                <Typography sx={{fontWeight:"400", fontSize:"39px", fontFamily:"inherit", color:"#C9AC8C"}} variant='h5'>{author.date_of_birth}</Typography>
                                <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"text.disabled"}} variant='body2'>{author.country}</Typography>
                            </Box>
                            <Typography sx={{textAlign:"center", fontWeight:"400", fontSize:"39px", fontFamily:"inherit", color:"#C9AC8C"}} variant='h5'>-</Typography>
                            <Box sx={{ml:"25px"}}>
                                <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"text.disabled"}} variant='body2'>Vafot etgan sana</Typography>
                                <Typography sx={{fontWeight:"400", fontSize:"39px", fontFamily:"inherit", color:"#C9AC8C"}} variant='h5'component={"h2"}>{author.date_of_death}</Typography>
                                <Typography sx={{fontWeight:"400", fontSize:"12px", fontFamily:"inherit", color:"text.disabled"}} variant='body2'>{author.country}</Typography>
                            </Box>
                        </Box>
                    </Box>
            </Box>
            <Box sx={{mt:"100px", mb:"120px"}}>
                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Typography sx={{fontWeight:"400", fontSize:"31px", fontFamily:"inherit", color:"#D1B89D"}} variant='h5'>{t("auhtorSingle.text")}</Typography>
                    <Link sx={{textDecoration:"none", width:"170px", color:"#D1B89D", fontSize:"16px", lineHeight:"24px"}} component={RouterNavlink} to="/book">{t("auhtorSingle.link")}</Link>
                </Box>
            {books?.length ? (
                <Box sx={{mt:"30px", height:"352px", overflow:"hidden"}}>
                    <Slider {...settings}>
                        {books.map(el => (
                        <Link key={el.id} sx={{textDecoration:"none", width:"95px", color:"#D1B89D", fontSize:"16px", lineHeight:"23px",'&.active': {color: '#0D0D0D'}}} component={RouterNavlink} to={`/bookpage/${el.id}`}>
                            <img src={`http://localhost:5000/${el.image}`} style={{width:"190px", height:"283px", borderRadius:"15px"}} width={190} height={283} alt={el.title} />
                            <Typography sx={{fontWeight:"400", m:"12px 6px", fontSize:"18px", fontFamily:"inherit", color:"background.card_color"}} variant='body2'>{el.title}</Typography>
                            <Typography sx={{fontWeight:"400", fontSize:"16px", fontFamily:"inherit", color:"text.disabled"}} variant='body2'>{author.first_name} {author.last_name}</Typography>
                        </Link>
                        ))}
                    </Slider>
                </Box>
            ) : (<h2>Not found</h2>)}
            </Box>
        </>
        )
    }