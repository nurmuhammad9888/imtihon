import { Avatar, Button, IconButton, Link, List, ListItem, Menu, MenuItem, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as RouterNavlink } from 'react-router-dom';
import { deletToken, userDelet } from '../../pages/Register/UserAction';
import arrowImg from "../../assets/images/select-arrow.svg"
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // {t("Card.Capital")}
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handlerDeletUser = () => {
        dispatch(userDelet(localStorage.removeItem("user")));
        dispatch(deletToken(localStorage.removeItem("token")));
    }

    return (
        <>
            <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center", marginY:"27px"}}>
                <Box>
                    <Link sx={{textDecoration:"none", color:"#D1B89D", fontSize:"25px", lineHeight:"38px"}} component={RouterNavlink} to="/">Badiiyat</Link>
                </Box>
            <List sx={{display:"flex", padding:"0"}}>
                <ListItem sx={{padding:"0"}}>
                    <Link sx={{textDecoration:"none", width:"95px", color:"text.disabled", fontSize:"16px", lineHeight:"23px",'&.active': {color: 'text.primary'}}} component={RouterNavlink} to="/home">{t("header.authors")}</Link>
                </ListItem>
                <ListItem sx={{padding:"0"}}>
                    <Link sx={{textDecoration:"none", color:"text.disabled", fontSize:"16px", lineHeight:"23px", marginX:"42px",'&.active': {color: 'text.primary'}}} component={RouterNavlink} to="/book">{t("header.books")}</Link>
                </ListItem>
                <ListItem sx={{padding:"0"}}>
                    <Box sx={{ flexGrow: 0 }}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , width:"49px", height:"49px" , borderRadius:"50%", backgroundColor:"#C4C4C4", fontSize:"16px"}}>
                                    {userData.user.image !== null ? (
                                            <Avatar sx={{width:"49px", height:"49px", borderRadius:"50%"}} alt="Remy Sharp" src={`http://localhost:5000/${userData.user.image}`}/>
                                    ) : (userData.user.last_name.charAt(0) + userData.user.first_name.charAt(0))}
                                </IconButton>
                            </Tooltip>
                            <img style={{marginLeft:"11px"}} src={arrowImg} alt="arrow img" />
                        </Box>
                        <Menu sx={{ mt: '55px',"& ul":{padding:"0", backgroundColor:"background.default"}}} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top', horizontal: 'right',}} keepMounted transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                            <MenuItem sx={{padding:"8px 24px", fontFamily:"inherit"}}  onClick={handleCloseUserMenu}>
                                <Link sx={{textDecoration:"none", fontWeight:"500" ,color:"text.orange", display:"block", width:"100%", textAlign:"left"}} to="/profile" component={RouterNavlink} textAlign="center">{t("header.profile")}</Link>
                            </MenuItem>
                            <MenuItem sx={{padding:"8px 24px",fontFamily:"inherit"}}  onClick={handleCloseUserMenu}>
                                <Link sx={{textDecoration:"none", fontWeight:"500" ,color:"text.orange"}} to="/addauthor" component={RouterNavlink} textAlign="center">{t("header.addAuthor")}</Link>
                            </MenuItem>
                            <MenuItem sx={{padding:"8px 24px",fontFamily:"inherit"}}  onClick={handleCloseUserMenu}>
                                <Link sx={{textDecoration:"none", fontWeight:"500" ,color:"text.orange"}} to="/addbook" component={RouterNavlink} textAlign="center">{t("header.addBook")}</Link>
                            </MenuItem>
                            <MenuItem sx={{padding:"8px 24px",fontFamily:"inherit"}}  onClick={handleCloseUserMenu}>
                                <Button onClick={handlerDeletUser} sx={{padding:"0", fontWeight:"500" ,color:"text.orange" , display:"block", width:"100%", textAlign:"left", fontFamily:"inherit", fontSize:"16px", textTransform:"capitalize"}} variant='text'>{t("header.logOut")}</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </ListItem>
            </List>
            </Box> 
        </>
        )
    }
    