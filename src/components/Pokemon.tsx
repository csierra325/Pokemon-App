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
    type: string;
    moves1: string;
    moves2: string;
}

const initalState = {
    input: '',
    name: '',
    sprites: '',
    height: 0 ,
    weight: 0 ,
    type: '',
    moves1: '',
    moves2: '',
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
                this.setState(() => ({
                    name: data.name,
                    sprites,
                    weight: data.weight,
                    height: data.height,
                    type: data.types[0].type.name,
                    moves1: data.moves[0].move.name,
                    moves2: data.moves[1].move.name
                }))
                console.log(data)
            }) .catch((error) => {
                alert(error.message)
            })
    }

    render(){
        return(
            <div>
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
                            type={this.state.type}
                            moves1={this.state.moves1}
                            moves2={this.state.moves2}
                        />
                    }
            </div>
        )
    }
}

export default Pokemon;
