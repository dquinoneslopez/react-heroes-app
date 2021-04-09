import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('Debe devolver el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({ logged: false });

    })

    test('Debe autenticar y colocar el name del usuario', () => {

        const action = {
            type: types.login,
            payLoad: {
                name: 'Daniel'
            }
        };
        const state = authReducer({ logged: false }, action);

        expect(state).toEqual({ logged: true, name: 'Daniel' });

    })

    test('Debe borrar el name del usuario y poner logged en false', () => {

        const action = {
            type: types.logout
        };
        const state = authReducer({ logged: true }, action);

        expect(state).toEqual({ logged: false });

    })


})