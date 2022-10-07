/* 
   Container/Presentational Pattern:
    Enforce separation of concerns by separating the view from the application logic

    If we want to fetch images from an API and then show them on the screen, we would to separate this in two
    1. Presentational Components: That cares about how the data is shown.
    2. Container Components: Thar care what data is being shown to the user.

    Fetching the images deals with the application login, and the display of then deals with the view.

*/

/* 
    Presentational Component:

    Is our case we just one a component that map the images, and render them. So we can just create a
    functional component that receives the data through props, displays the images.

    This kind of components are usually stateless, they wont have a React State, at least they need it
    for UI purposes. The data that is received in the Presentational Component, is not altered by this component
    itself.
*/

import React, { useEffect } from 'react'

const RenderPokemonTeam = ({ pokemon }) => (
    <div>
        {
            pokemon ?
            <div>
                <p>This is your team: </p>
                <img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
            </div> :
            <p>Pokemon Not found</p>
        }
    </div>
)

export const RenderPokemonWithHook = () => {
    const [search, setSearch] = React.useState('ditto')
    const pokemon = useGetPokemon((search).toLowerCase())

    return(
        <div>
            {
                pokemon ?
                <div>
                    <input 
                            placeholder="Search a Pokemon"
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                    <p>This is your team: </p>
                    <img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
                </div> :
                <p>Pokemon Not found</p>
            }
        </div>
    )
}

const SearchBar = ({ setSearch, search, fetchData }) => (
    <>
        <input 
            placeholder="Search a Pokemon"
            onChange={e => setSearch(e.target.value)}
            value={search}
        />
        <button onClick={fetchData} >
            Search
        </button>
    </>
)


/*
    Container Component: 
    The main purpose of the Container Component is to pass the data to the Presentational Component,
    so, they do not render anything but the Presentational Component. Since this, they do not have styling
    either.
*/


const GetPokeData = () => {
    const [pokemon, setPokemon] = React.useState()
    const [search, setSearch] = React.useState('')

    function fetchData() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${(search).toLowerCase()}`).then(response =>
            response.json()
        ).then(data => { 
            setPokemon(data)
        }).catch(err => {
            return []
        })
    }

    return(
        <>
            <SearchBar 
                search={search}
                setSearch={setSearch}
                fetchData={() => fetchData()}
            />
            <RenderPokemonTeam pokemon={pokemon} />
        </>
    )
}

export  { GetPokeData }

/* We can also make use of a customized Hook to separate the logic and use it in the Presentational Component */
const useGetPokemon  = (search) => {
    const [pokemon, setPokemon] = React.useState()

    useEffect(() => {
        if(search !== '') {
            fetch(`https://pokeapi.co/api/v2/pokemon/${(search).toLowerCase()}`).then(response =>
            response.json()
        
    ).then(data => { 
        setPokemon(data)
    }).catch(err => {
        return null
    })
    }}, [search])

    return pokemon
}

/* By using hooks we still separating the logic from the view, just like in 
Container/Presentational Pattern,  it saves us an extra layer that was necessary 
in order to wrap the presentational component within the container component

PROS:
- Separation of concerns, components are just pure functions, and containers handle the logic for the app
- Presentational Components are easy to use and reuse through the app, since they do not alter the data.
- The presentational Components are easy to alter by someone who has no knowledge of the code (a designer)
- P.C are easy to test since they are pure functions.

CONST:
- We can got the same result using hooks (separate concerns) without adding the extra layer. However,
we can still using this patterns for smaller applications.

*/