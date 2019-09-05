import Axios from "axios";
import {urlApi} from "../../3.helpers/database";
import swal from 'sweetalert';


export const userLogin = (userObject) => {
    return (dispatch) => {
        dispatch({
            type: 'IS_LOADING'
        })

        Axios.get(urlApi + 'users', {
                params: {
                    username: userObject.username,
                    password: userObject.password
                }
            })
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            username: res.data[0].username,
                            role: res.data[0].role,
                            email: res.data[0].role,
                            id: res.data[0].id
                        }
                    })
                } else {
                    dispatch({
                        type: 'NOT_LOADING'
                    })
                    swal('Login Failed!', "Wrong username or password", "warning")
                }
            })
            .catch((err) => {
                dispatch({
                    type: 'NOT_LOADING'
                })
                swal('System Error!', "Unable to connect to server, try again later.", "error")
            })
    }
}