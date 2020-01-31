import {
    USER_SUBS
} from "../1.actions/types"

import Axios from "axios"
import {urlApi} from "../../3.helpers/database"


export const calcUserSubs = (idUser) => {
    return (dispatch) => {
        Axios.get(urlApi + `user/calcUserSubs/${idUser}`)
        .then(res => {
            let remainingHour = res.data.remaining

            dispatch({
                type: USER_SUBS,
                payload: {
                    idSubs: res.data.idSubs,
                    subsName: res.data.subsName,
                    remaining: remainingHour,
                    status: res.data.status
                }
            })
        })
        .catch(err => {
            console.log(err.response)
        })
    }
}