import { Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink as RouterNavlink } from 'react-router-dom';

export const HomeCard = ({item}) => {
    const {first_name, last_name ,date_of_birth, date_of_death,id,image } = item;
	return (
        <Grid sx={{marginTop:"8px",padding:"0",border:"1px solid #414040", mr:"20px",borderRadius:"22px"}} item xs={3}>
            <Link sx={{textDecoration:"none"}} to={`/page/${id}`} component={RouterNavlink}>
                <Box sx={{borderRadius:"22px",backgroundColor:"background.default", width:"295px", height:"365px"}}>
                    <img style={{borderRadius:"22px 22px 0px 0px", width:"295px", height:"224px"}} src={`http://localhost:5000/${image}`} width={295} height={224} alt="" />
                    <Box sx={{padding:"12px 16px"}}>
                        <Typography sx={{color:"background.card_color", fontSize:"24px",lineHeight:"36px", fontWeight:"500", fontFamily:"inherit"}} variant='h5'>{first_name} {last_name }</Typography>
                        <Typography sx={{color:"text.disabled", fontSize:"16px", fontFamily:"inherit", marginTop:"6px"}} variant='body2'>{date_of_birth} - {date_of_death}</Typography>
                    </Box>
                </Box>
            </Link>
        </Grid>
	);
};
