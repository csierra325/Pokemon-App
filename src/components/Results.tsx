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
                                <img className={'icon'} src={`images/${type}.png`}/>
                            )
                        })}
                    </div>
                </div>
                <img className="pokemonSpirite border-gradient border-gradient-purple" src={props.sprites} alt="pokemon img" />
                <div className="description">
                    <div className="description-item">{`Weight: ${props.weight}lbs `}</div>
                    <div className="description-item">{`Height: ${props.height}ft `}</div>
                </div>
                <div className="move-list">
                    {props.movesArray.map((move) => {
                        const linkContent = props.movesDescription;
                        return (
                            <div className="move-item">
                                <div className="moves">{move} - <div className="move-description">{linkContent}</div></div>
                            </div>
                        )    
                    })}
                </div>
            </div>
        </div>
     </div>
           
    )
}

export default Results
