import { types } from '../types/types';

// const state = {
//     name: 'Daniel',
//     logged: true
// }

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payLoad,
                logged: true
            }
            break;

        case types.logout:
            return {
                logged: false
            }
            break;

        default:
            return state;
            break;
    }
}