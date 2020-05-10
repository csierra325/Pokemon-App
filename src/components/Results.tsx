import React from 'react'

interface IProps {
    name: string;
    sprites: string;
    weight: number;
    height: number;
    type: string;
    moves1: string;
    moves2: string;
}

const Results = (props: IProps) => {
    return (
        <div className="container">
            <div className={`innerCard searchDiv ${props.type}`}>
                <div className="pokemonName">{`${props.name}-${props.type}`}</div>
                <img className="pokemonSpirite border-gradient border-gradient-purple" src={props.sprites} alt="pokemon img" />
                <div className="description">
                    <div className="description-item">{`Weight: ${props.weight}lbs `}</div>
                    <div className="description-item">{`Height: ${props.height}ft `}</div>
                </div>
                <div className="moves">
                    <div className="moves">{`${props.moves1} `}</div>
                    <hr></hr>
                    <div className="moves">{`${props.moves2} `}</div>
                    <hr></hr>
                </div>
            </div>
s        </div>
    )
}

export default Results
