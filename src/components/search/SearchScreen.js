import React, { useMemo } from 'react'
import queryString from "query-string";

import { useLocation } from 'react-router-dom';
import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useform';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {
    
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    
    const [formValues, handleInputChange, reset] = useForm({
        searchText: q
    });
    
    const { searchText } = formValues;
    
    const heroesFiltered = useMemo(() => getHeroesByName(q), [ q ]);
    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    }
    
    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="find your hero"
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-outline-primary w-100"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                   
                    {
                        (q === '') && 
                        <div className="alert alert-info">
                            Search for a hero.
                        </div>
                    }
                    
                    {
                        (q !== '' && heroesFiltered.length === 0) && 
                        <div className="alert alert-danger">
                            There is no hero with the name '{q}'.
                        </div>
                    }
                    
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
