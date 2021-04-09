import React from 'react';
import { mount } from 'enzyme'
import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen/>', () => {

    const historyMock = {
        replace: jest.fn()
    }
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Daniel'
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ historyMock }/>
        </AuthContext.Provider>
    );

    test('Debe mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    })

    test('Debe realizar el dispatch y la navegación', () => {

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();
        
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payLoad: {
                name: 'Daniel'
            }
        });
        expect(historyMock.replace).toHaveBeenCalledWith('/');
        
        localStorage.setItem('lastPath', '/dc');
        handleClick();
        
        expect(historyMock.replace).toHaveBeenCalledWith('/dc');        
        
    })
    

})