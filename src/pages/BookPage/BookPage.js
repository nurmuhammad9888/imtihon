import { Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import arrowIcon from "../../assets/images/arrowicon.svg";
import { NavLink as RouterNavlink } from 'react-router-dom';
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next';

export const BookPage = () => {
    const { t } = useTranslation();

    const userData = useSelector(state => state);
    const { id } = useParams()
    const [books, setBooks] = useState([]);
    const [authorBooks, setAuthorBooks] = useState([]);
    const [author, setAuthor] = useState([]);

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
        axios.get("http://localhost:5000/author/authorId/" + books.author_id ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setAuthor(res.data)
    }}).catch(err => console.log(err))
    }, [books.author_id])

    useEffect(() => {
        axios.get("http://localhost:5000/book/bookId/" + id ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setBooks(res.data)
    }}).catch(err => console.log(err))
    }, [id])


    useEffect(() => {
        axios.get("http://localhost:5000/author/books/" + books.author_id ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setAuthorBooks(res.data)
    }}).catch(err => console.log(err))
    }, [books.author_id])

    return (
        <>
        <Header/>
            <Box sx={{display:"flex", mt:"47px"}}>
                    <Box sx={{width:"505px", height:"681px", borderRadius:"20px"}}>
                        <img src={`http://localhost:5000/${books.image}`} style={{width:"505px", height:"681px", borderRadius:"20px"}} width={505} height={681} alt="" />
                    </Box>
                    <Box sx={{ml:"64px",width:"100%", mt:"30px"}}>
                        <Typography variant='h4' component={"h2"} sx={{color:"#D1B89D", fontSize:"48px",lineHeight:"72px", fontWeight:"400", fontFamily:"inherit"}}>{books.title}</Typography>
                        <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                            <Box>
                                <Typography sx={{fontWeight:"400",mt:"14px", fontSize:"20px", fontFamily:"inherit", color:"text.primary"}} variant='body2'>Sahifalar soni:</Typography>
                                <Typography sx={{fontWeight:"400",mt:"14px", fontSize:"20px", fontFamily:"inherit", color:"text.primary"}} variant='body2'>Chop etilgan:</Typography>
                                <Typography sx={{fontWeight:"400",mt:"14px", fontSize:"20px", fontFamily:"inherit", color:"text.primary"}} variant='body2'>Kitob narxi:</Typography>
                            </Box>
                            <Box sx={{ml:"25px"}}>
                                <Typography sx={{fontWeight:"400",mt:"14px", fontSize:"20px", fontFamily:"inherit", color:"text.secondary"}} variant='body2'>{books.page} page</Typography>
                                <Typography sx={{fontWeight:"400",mt:"14px", fontSize:"20px", fontFamily:"inherit", color:"text.secondary"}} variant='body2'>{books.year} years</Typography>
                                <Typography sx={{fontWeight:"400",mt:"14px", fontSize:"20px", fontFamily:"inherit", color:"text.secondary"}} variant='body2'>${books.price}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", alignItems:"center", mt:"40px", mb:"12px"}}>
                            <Box sx={{width:"190px"}}>
                                <Typography sx={{fontWeight:"400",mr:"3px",fontSize:"16px", fontFamily:"inherit", color:"#D1B89D"}} variant='body2'>To’liq ma’lumot</Typography>
                            </Box>
                            <img src={arrowIcon} width={8} height={12} alt="icon arrow" />
                            <Typography sx={{border:"1px solid rgba(209, 184, 157, 0.6)", ml:"16px",width:"100%"}} variant='subtitle2'></Typography>
                        </Box>
                        <Typography variant='body2' sx={{color:"text.primary", fontSize:"16px",lineHeight:"24px", fontWeight:"400", fontFamily:"inherit"}}>
                            {books.description}
                        </Typography>
                    </Box>
            </Box>
            <Box sx={{mt:"100px", mb:"120px"}}>
                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Typography sx={{fontWeight:"400", fontSize:"31px", fontFamily:"inherit", color:"#D1B89D"}} variant='h5'>{t("auhtorSingle.text")}</Typography>
                    <Link sx={{textDecoration:"none", width:"170px", color:"#D1B89D", fontSize:"16px", lineHeight:"24px"}} component={RouterNavlink} to="/book">{t("auhtorSingle.link")}</Link>
                </Box>
                {authorBooks?.length ? (
                    <Box sx={{mt:"30px", height:"352px", overflow:"hidden"}}>
                        <Slider {...settings}>
                            {authorBooks.map(el => (
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