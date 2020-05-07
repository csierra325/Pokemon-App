import React from 'react';

import Results from './Results'

//interface is the outline of communication
interface IProps {}
interface IState {
    input: string;
    name: string;
    sprites: string;
}

const initalState = {
    input: '',
    name: '',
    sprites: '',
}


class Pokemon extends React.Component<IProps, IState> {
    state: Readonly<IState> = initalState; 

    handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        this.setState(() => ({ input }))
    }

    handleSubmit = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.input}`)
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
                    sprites
                }))
                console.log(sprites)
            }) .catch((error) => {
                console.log(error.message)
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
                            name={this.state.name}
                            sprites={this.state.sprites}
                        />
                    }
            </div>
        )
    }
}

export default Pokemon;
