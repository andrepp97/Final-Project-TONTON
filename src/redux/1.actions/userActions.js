import { 
    LOGIN_SUCCESS,
    USER_LOGOUT,
    IS_LOADING,
    NOT_LOADING,
    NAV_ITEM_CHANGE
 } from "./types"

 
import Axios from "axios"
import {urlApi} from "../../3.helpers/database"
import swal from 'sweetalert'



export const navItemChange = (navItem) => {
    return {
        type: NAV_ITEM_CHANGE,
        payload: navItem
    }
}


export const confirmLogin = (user) => {
    console.log(user)
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const userLogin = (userObject) => {
    return (dispatch) => {
        dispatch({
            type: IS_LOADING
        })

        Axios.post(urlApi + 'user/userLogin', {
                email: userObject.email,
                password: userObject.password
            }).then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        id: res.data.id,
                        username: res.data.username,
                        email: res.data.email,
                        role: res.data.roleName
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: NOT_LOADING
                })
                swal('We Are Sorry', "Unable to connect to server, try again later.", "error")
            })
    }
}


export const keepLogin = (token) => {
    return (dispatch) => {
        var options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.post(urlApi + 'user/userKeepLogin', null, options)
            .then(res => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                localStorage.removeItem('token')
                console.log(err)
                dispatch({
                    type: USER_LOGOUT
                })
            })
    }
}


export const userLogout = () => {
    localStorage.removeItem('token')
    return {
        type: USER_LOGOUT
    }
}