import { ON_MOVIE_PLAY, CALC_MOVIE_VIEWS } from "../1.actions/types"

const INITIAL_STATE = {
    idMov: 0,
    movieName: '',
    movieUrl: '',
    moviePoster: '',
    views: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_MOVIE_PLAY:
            return {
                ...INITIAL_STATE,
                idMov: action.payload.idMov,
                movieName: action.payload.movieName,
                movieUrl: action.payload.movieUrl,
                moviePoster: action.payload.moviePoster
            }
        case CALC_MOVIE_VIEWS:
            return {...state, views: action.payload}
        default:
            return state;
    }
}