import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink as RouterNavlink, Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const ProfileHaeder = () => {
    const { t } = useTranslation();

    return (
        <>
            <Box sx={{display:"flex"}}>
                <Box sx={{width:"100%"}}>
                    <Link sx={{textDecoration:"none", width:"100%",backgroundColor:"background.nav", display:"flex", alignItems:"center",padding:"23px ",borderRadius:"4px 4px 0px 0px",'&.active': {backgroundColor:"background.navActive"}, '&.active .css-1l9vjoo-MuiTypography-root':{backgroundColor:"#152540", color: '#fff'}, '&.active .css-337l3h-MuiTypography-root':{color: '#152540'}}} to={`/profile`} end component={RouterNavlink}>
                        <Typography sx={{fontWeight:"600",mr:"9px", fontSize:"16px", fontFamily:"inherit", color:"#3699FF", backgroundColor:"#E5EAEE", borderRadius:"4px", padding:"6px 15px"}} variant='body2'>1</Typography>
                        <Typography sx={{fontWeight:"600", fontSize:"14px", fontFamily:"inherit", color:"#464E5F"}} variant='body2'>{t("prfileNavLinks.profile")}</Typography>
                    </Link>
                </Box>
                <Box sx={{width:"100%"}}>
                    <Link sx={{textDecoration:"none", width:"100%",backgroundColor:"background.nav", display:"flex", alignItems:"center",padding:"23px ",borderRadius:"4px 4px 0px 0px",'&.active': {backgroundColor:"background.navActive"}, '&.active .css-1l9vjoo-MuiTypography-root':{backgroundColor:"#152540", color: '#fff'}, '&.active .css-337l3h-MuiTypography-root':{color: '#152540'}}} to={`security`} component={RouterNavlink}>
                        <Typography sx={{fontWeight:"600",mr:"9px", fontSize:"16px", fontFamily:"inherit", color:"#3699FF", backgroundColor:"#E5EAEE", borderRadius:"4px", padding:"6px 15px"}} variant='body2'>2</Typography>
                        <Typography sx={{fontWeight:"600", fontSize:"14px", fontFamily:"inherit", color:"#464E5F"}} variant='body2'>{t("prfileNavLinks.security")}</Typography>
                    </Link>
                </Box>
                <Box sx={{width:"100%"}}>
                    <Link sx={{textDecoration:"none", width:"100%",backgroundColor:"background.nav", display:"flex", alignItems:"center",padding:"23px ",borderRadius:"4px 4px 0px 0px",'&.active': {backgroundColor:"background.navActive"}, '&.active .css-1l9vjoo-MuiTypography-root':{backgroundColor:"#152540", color: '#fff'}, '&.active .css-337l3h-MuiTypography-root':{color: '#152540'}}} to={`settings`} component={RouterNavlink}>
                        <Typography sx={{fontWeight:"600",mr:"9px", fontSize:"16px", fontFamily:"inherit", color:"#3699FF", backgroundColor:"#E5EAEE", borderRadius:"4px", padding:"6px 15px"}} variant='body2'>3</Typography>
                        <Typography sx={{fontWeight:"600", fontSize:"14px", fontFamily:"inherit", color:"#464E5F"}} variant='body2'>{t("prfileNavLinks.settings")}</Typography>
                    </Link>
                </Box>
            </Box>
            <Outlet />
        </>
        )
    }
    