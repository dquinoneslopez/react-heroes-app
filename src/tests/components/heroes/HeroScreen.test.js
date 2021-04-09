import React from 'react';
import { mount } from 'enzyme'
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Router } from 'react-router-dom';


import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen/>', () => {
    
    const historyMock = {
        legth: 10,
        goBack: jest.fn(),
        push: jest.fn()
    }
    
    test('Debe mostrar el componente <Redirect/> si no hay argumentos en la url', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock}/>
            </MemoryRouter>
        );    
        
        expect(wrapper.find('Redirect').exists()).toBe(true);
        
    })
    
    test('Debe mostrar un héroe si el parámetro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={historyMock}/>}
                />
                {/* <HeroScreen history={historyMock}/> */}
            </MemoryRouter>
        ); 
        
        expect(wrapper.find('.row').exists()).toBe(true);
        
    })
    
    test('Debe regresar a la pantalla anterior con PUSH', () => {
        
        const history = {
            legth: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={(props) => <HeroScreen history={ history }/>}
                />
                {/* <HeroScreen history={history}/> */}
            </MemoryRouter>
        ); 
        
        wrapper.find('button').prop('onClick')();
                
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
                
    })
    
    test('Debe regresar a la pantalla anterior con goBack', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={(props) => <HeroScreen history={ historyMock }/>}
                />
            </MemoryRouter>
        ); 
        
        wrapper.find('button').prop('onClick')();
                
        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();
        
    })
    
    
    test('Debe llamar el redirect si el héroe no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spidersadfasdf']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={(props) => <HeroScreen history={ historyMock }/>}
                />
            </MemoryRouter>
        ); 
        
        expect(wrapper.text()).toBe('');
        
    })
    
    
})
