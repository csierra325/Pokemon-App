import React from 'react'

interface IProps {
    name: string;
    sprites: string;
    weight: number;
    height: number;
    type: string;
    movesArray: string[];
}

const Results = (props: IProps) => {
    return (
        <div className="container">
            <div className={`innerCard ${props.type}`}>
                <div className='title'>
                    <div className="pokemonName">{`${props.name}`}</div>
                    <div  className='HPIcon'>
                        <div className="pokemonName">40 HP</div>
                        <img className={'icon'} src={`images/${props.type}.png`}/>
                    </div>
                </div>
                <img className="pokemonSpirite border-gradient border-gradient-purple" src={props.sprites} alt="pokemon img" />
                <div className="description">
                    <div className="description-item">{`Weight: ${props.weight}lbs `}</div>
                    <div className="description-item">{`Height: ${props.height}ft `}</div>
                </div>
                <div className="move-list">
                    {props.movesArray.map((move) => {
                        return (
                            <div>
                                <div className="move-item">{`${move}`}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
s        </div>
    )
}

export default Results
