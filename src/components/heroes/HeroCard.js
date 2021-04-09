import React from 'react';
import { Link } from "react-router-dom";

import { heroesImages } from "../../helpers/heroesImages";

export const HeroCard = ({
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters
}) => {
    return (
        <div className="col">
            <div className="card ms-3 h-100" style={{ maxWidth: 540 }}>
                <div className="row no-gutters h-100">
                    <div className="col md-4">
                        <img
                            // src={`./assets/heroes/${id}.jpg`}
                            src={heroesImages(`./${id}.jpg`).default}
                            className="card-img h-100"
                            alt={superhero}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>
                            {
                                (alter_ego !== characters)
                                && <p className="card-text">{characters}</p>
                            }
                            <p className="card-text"><small>{first_appearance}</small></p>
                            <Link to={`./hero/${id}`}>
                                Más...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
