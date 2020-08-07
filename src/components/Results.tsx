import React from 'react'

interface IProps {
    name: string;
    sprites: string;
    weight: number;
    height: number;
    cardColor: string;
    typesArray: string[];
    movesArray: string[];
    movesDescription: string;
    pokemonDescription: string;
    weakness: string[];
    resistance: string[];
    retreat: string[];
}
 
const Results = (props: IProps) => {
    return (
        <div className="container">
            <div className="outer-card">
            <div className={`innerCard ${props.cardColor}`}>
                <div className='title'>
                    <div className="pokemonName">{`${props.name}`}</div>
                    <div  className='HPIcon'>
                        <div className="pokemonName">40 HP</div>
                        {props.typesArray.map((type) => {
                            return (
                                <img className={'icon'} alt="type" src={`images/${type}.png`}/>
                            )
                        })}
                    </div>
                </div>
                <img className="pokemonSpirite border-gradient border-gradient-purple" src={props.sprites} alt="pokemon img" />
                <div className="description description-gradient-purple">
                    <div className="description-item">{`Weight: ${props.weight}lbs `}</div>
                    <div className="description-item">{`Height: ${props.height}ft `}</div>
                </div>
                <div className="move-list">
                    {props.movesArray.map((move) => {
                        const linkContent = props.movesDescription;
                        return (
                            <div className="move-item">
                                <div className="moves">{move} <br></br> <div className="move-description">{linkContent}</div></div>
                            </div>
                        )    
                    })}
                </div>
                <div className="type-descriptions">
                    <div className="type-group">
                        <div className="weakness">Weakness</div>
                        <img className={'weakness-icon'} alt="weakness" src={`images/${props.weakness}.png`}/>
                    </div>
                    <div className="type-group">
                        <div className="weakness">resistance</div>
                        <img className={'weakness-icon'} alt="resistance" src={`images/${props.resistance}.png`}/>
                    </div>
                    <div className="type-group">
                        <div className="weakness">retreat</div>
                        <img className={'weakness-icon'} alt="retreat" src={`images/${props.retreat}.png`}/>
                    </div>
                </div>
                <div>{props.pokemonDescription}</div>
            </div>
        </div>
     </div>
           
    )
}

export default Results
