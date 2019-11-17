import { ON_MOVIE_PLAY, CALC_MOVIE_VIEWS } from './types'

import Axios from "axios"
import {urlApi} from "../../3.helpers/database"


export const onMoviePlay = (idMov) => {
    return (dispatch) => {
        Axios.post(urlApi + 'movie/getMovieUrl', {
            idMov
        }).then(res => {
            dispatch({
                type: ON_MOVIE_PLAY,
                payload: {
                    idMov: res.data.id,
                    movieName: res.data.movieName,
                    movieUrl: res.data.filePath,
                    moviePoster: res.data.poster
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const calcMovieViews = (idMov, idUser) => {
    return (dispatch) => {
        Axios.post(urlApi + 'movie/calcMovieViews', {
            idMov,
            idUser
        }).then(res => {
            dispatch({
                type: CALC_MOVIE_VIEWS,
                payload: res.data.counter
            })
        }).catch(err => {
            console.log(err)
        })
    }
}