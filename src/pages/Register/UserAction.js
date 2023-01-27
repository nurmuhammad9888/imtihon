import { DELET_TOKEN, DELET_USER, GET_USER, SAVE_TOKEN, THEME } from "./UserType";

// TOKEN
export const deletToken = () => {
    return{
        type:DELET_TOKEN,
        payload:''
    }
}

export const saveToken = (token) => {
    return{
        type:SAVE_TOKEN,
        payload:token
    }
}

// USER 
export const userGet = (user) => {
    return{
        type:GET_USER,
        payload:user
    }
}

export const userDelet = () => {
    return{
        type:DELET_USER,
        payload:""
    }
}
export const theme = () => {
    return{
        type:THEME,
        // payload:""
    }
}

