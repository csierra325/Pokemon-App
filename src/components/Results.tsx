import React from 'react'

interface IProps {
    name: string;
    sprites: string;
}

const Results = (props: IProps) => {
    return (
        <div>
            <div className="pokemonName">{`Name: ${props.name}`}</div>
            <img src={props.sprites} alt="pokemon img" />
        </div>
    )
}

export default Results
