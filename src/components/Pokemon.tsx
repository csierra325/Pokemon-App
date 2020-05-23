import React from 'react';

import Results from './Results'
import './Pokemon.scss'; 

//interface is the outline of communication
interface IProps {}
interface IState {
    input: string;
    name: string;
    sprites: string;
    weight: number;
    height: number;
    cardColor: string;
    typesArray: string[];
    movesArray: string[];
    // description:string;
}

const initalState = {
    input: '',
    name: '',
    sprites: '',
    height: 0 ,
    weight: 0 ,
    cardColor: '',
    typesArray: [],
    movesArray: [],
    // description:'',
}



class Pokemon extends React.Component<IProps, IState> {
    state: Readonly<IState> = initalState; 

    handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        this.setState(() => ({ input }))
    }

    handleSubmit = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.input.toLowerCase()}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('pokemon not found')
                }
                return response.json()
            })
            .then((data) => {
                const sprites = 
                    Math.floor(Math.random() * 5) + 1 === 5 ?
                    data.sprites.front_shiny:
                    data.sprites.front_default

                    const movesArray: string[] = []
                    const requestedMoves = 2
                    for ( let i = 0; i < Math.min(requestedMoves, data.moves.length); i++) {
                        movesArray.push(data.moves.splice(Math.floor(Math.random() * data.moves.length), 1)[0].move.name)
                    }

                    const typesArray: string[] = []
                    const requestedTypes = 2
                    for ( let i = 0; i <  data.types.length; i++) {
                        typesArray.push(data.types[i].type.name)
                    }
                this.setState(() => ({
                    name: data.name,
                    sprites,
                    weight: data.weight,
                    height: data.height,
                    cardColor: typesArray[0],
                    typesArray,
                    movesArray,
                }))
                console.log(data)
                return data;
            })
            // .then((data) => {
            //     fetch(`https://pokeapi.co/api/v2/characteristic/${data.id}/`) 
            //         .then((response) =>{
            //             if (!response.ok) {
            //                 throw new Error('pokemon description not found')
            //             }
            //             return response.json()
            //         })
            //         .then((data) => {
            //             console.log(`2 ${data.descriptions[1].description}`)
            //         })

            // }) 
             .catch((error) => {
                alert(error.message)
                })

    }

    render(){
        return(
            <div className="app-container">
                <h1>Find Your Pokemon</h1>
                <input
                    type="text"
                    onChange={this.handleInput}
                />
                <button
                    onClick={this.handleSubmit}
                >Search</button>
                    {this.state.name && 
                        <Results 
                            sprites={this.state.sprites}
                            name={this.state.name}
                            weight={this.state.weight}
                            height={this.state.height}
                            cardColor={this.state.cardColor}
                            typesArray={this.state.typesArray}
                            movesArray={this.state.movesArray}
                        />
                    }
            </div>
        )
    }
}

export default Pokemon;
