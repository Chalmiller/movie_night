import { CHANGE_MOVIE_TITLE } from './constants';

export const setMovieTitle = (text) => ({
    type: CHANGE_MOVIE_TITLE,
    payload: text
})