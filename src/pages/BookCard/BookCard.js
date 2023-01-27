import { Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink as RouterNavlink } from 'react-router-dom';

export const BookCard = ({item}) => {
    const {title,id,image, author_id } = item;

    const userData = useSelector(state => state);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/author/authorId/" + author_id ,{headers:{
            "Authorization": userData.user.token
    }}).then(res => {
        if(res.status === 201){
            // console.log(res)
            setGenres(res.data)
    }}).catch(err => console.log(err))
    }, [])
    
	return (
            <Grid sx={{marginTop:"8px"}} item xs={2}>
                <Link sx={{textDecoration:"none"}} to={`/bookpage/${id}`} component={RouterNavlink}>
                    <Box sx={{borderRadius:"22px", width:"190px", height:"382px"}}>
                        <img style={{borderRadius:"22px 22px 0px 0px", width:"190px", height:"283px"}} src={`http://localhost:5000/${image}`} width={190} height={283} alt="" />
                        <Box sx={{padding:"12px 16px"}}>
                            <Typography sx={{color:"background.card_color", fontSize:"16px",lineHeight:"27px", fontWeight:"500", fontFamily:"inherit"}} variant='h5'>{title}</Typography>
                            <Typography sx={{color:"text.disabled", fontSize:"16px", fontFamily:"inherit", marginTop:"6px"}} variant='body2'>{genres.first_name} {genres.last_name }</Typography>
                        </Box>
                    </Box>
                </Link>
            </Grid>
	);
};
