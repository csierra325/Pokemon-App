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
    hp: number;
    movesDescription: string;
    pokemonDescription: string;
    weakness: string[];
    resistance: string[];
    retreat: string[];
    typesArray: string[];
    movesArray: string[];
}

const initalState = {
    input: '',
    name: '',
    sprites: '',
    height: 0 ,
    weight: 0 ,
    cardColor: '',
    hp: 0,
    movesDescription: '',
    pokemonDescription: '',
    weakness: [],
    resistance: [],
    retreat: [],
    typesArray: [],
    movesArray: [],
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
                return data;
            })
            .then((data) => {
                for ( let i = 0; i < this.state.movesArray.length; i++) {
                fetch(`https://pokeapi.co/api/v2/move/${this.state.movesArray[i]}`) 
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('move description not found')
                        }
                        return response.json()
                    })
                    .then((data) => {
                        this.setState(() => ({
                            movesDescription: data.effect_entries[0].short_effect
                        }))
                    })
                }
            }) 
            .then((data) => {
                for ( let i = 0; i < this.state.typesArray.length; i++) {
                    fetch(`https://pokeapi.co/api/v2/type/${this.state.typesArray[i]}`) 
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('type not found')
                        }
                        return response.json()
                    })
                    .then((data) => {
                        let noDamageFrom: any;
                        let noDamageTo : any;
                        let doubleDamageFrom: any;
                        !data.damage_relations.double_damage_from.length ? doubleDamageFrom = '' : doubleDamageFrom = data.damage_relations.double_damage_from[0].name
                        !data.damage_relations.no_damage_from.length ?  noDamageFrom = '' : noDamageFrom = data.damage_relations.no_damage_from[0].name
                        !data.damage_relations.no_damage_to.length ? noDamageTo = '' : noDamageTo = data.damage_relations.no_damage_to[0].name
                        this.setState(() => ({
                            weakness: doubleDamageFrom,
                            resistance: noDamageFrom,
                            retreat:  noDamageTo,
                        }))
                    })
                }
            })
            .then((data) => {
                for ( let i = 0; i < this.state.typesArray.length; i++) {
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.state.name}/`) 
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('type not found')
                        }
                        return response.json()
                    })
                    .then((data) => {
                        this.setState(() => ({
                            pokemonDescription: data.flavor_text_entries[0].flavor_text
                        }))
                    })
                }
            })
             .catch((error) => {
                console.log(error.message)
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
                <div className="card-results">
                    {this.state.name && 
                        <Results 
                            sprites={this.state.sprites}
                            name={this.state.name}
                            weight={this.state.weight}
                            height={this.state.height}
                            cardColor={this.state.cardColor}
                            typesArray={this.state.typesArray}
                            movesArray={this.state.movesArray}
                            movesDescription={this.state.movesDescription}
                            pokemonDescription={this.state.pokemonDescription}
                            weakness={this.state.weakness}
                            resistance={this.state.resistance}
                            retreat={this.state.retreat}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Pokemon;
