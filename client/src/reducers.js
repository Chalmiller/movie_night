import { CHANGE_MOVIE_TITLE } from './constants';

const initialState = {
    title: ''
}

export const setTitle = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_MOVIE_TITLE:
            return Object.assign({}, state, { title: action.payload });
            // return { ...state, title: action.payload }
        default:
            return state;
    }
}