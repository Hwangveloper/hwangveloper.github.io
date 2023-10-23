import { GET_TODO_LIST } from './actions';

const initialState = {
    data: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TODO_LIST:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};