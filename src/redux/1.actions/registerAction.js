import Axios from 'axios'
import swal from 'sweetalert'
import { urlApi } from '../../3.helpers/database'
import {
    ON_USER_REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from "./types"


export const userSignup = (signupObject) => {
    return (dispatch) => {
        dispatch({
            type: ON_USER_REGISTER
        })

        // GET the duplicate username
        Axios.post(urlApi + 'user/signup', {
            username: signupObject.username,
            password: signupObject.password,
            email: signupObject.email
        }).then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: signupObject.email
            })
        }).catch((err) => {
            console.log(err.response)
            dispatch({
                type: REGISTER_FAILED
            })
            if (err.response.data === 'email used') {
                swal({
                    title: "Signup Failed",
                    text: "Email is Already Used by Another User",
                    icon: "warning"
                })
            } else {
                console.log(err.response)
            }
        })
    }
}