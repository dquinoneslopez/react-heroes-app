import React from 'react';
import { mount } from 'enzyme'
import '@testing-library/jest-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <SearchScreen/>', () => {

    const historyMock = {
        replace: jest.fn()
    }
    
    const wrapper = mount(
        <MemoryRouter initialEntries={['/search']}>
            <Route 
                path="/search"
                component={SearchScreen}
            />
        </MemoryRouter>
    );

    test('Debe mostrarse correctamente con valores por defecto', () => {
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search for a hero.');
        

    })
    
    test('Debe mostrar el héroe y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                    path="/search"
                    component={SearchScreen}
                />
            </MemoryRouter>
        );
        
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
        
    })
    
    test('Debe mostrar un error si no se encuentra el héroe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=barman']}>
                <Route 
                    path="/search"
                    component={SearchScreen}
                />
            </MemoryRouter>
        );
        
        // console.log(wrapper.html())
        
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
        expect(wrapper.find('.alert-danger').text().trim()).toEqual("There is no hero with the name 'barman'.");
        expect(wrapper).toMatchSnapshot();
        
    })

    test('Debe llamar el push del history', () => {
        
        const history = {
            push: jest.fn()
        }
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                    path="/search"
                    component={() => <SearchScreen history={history} />}
                />
            </MemoryRouter>
        );
        
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        
        expect(history.push).toHaveBeenCalledWith(`?q=batman`)
        
    })
    

})