import React from 'react'
/* 
    Provider pattern: Make data available to multi child components

    Passing props deep in the components is know as Props Drilling, and it becomes hard to refactor
    in hard to understand where does the props comes from.
*/

const PokemonContext = React.createContext()

const TestingProvider = () => {

    const someData = {
        name: "pikachu",
        ability: 'paralizer',
        attacks: [
            "ThunderBolt",
            "Iron Tail",
            "Agility",
            "Quick Attack"
        ],
        evolutions: ['Raichu'],
        pre_evolutions: ['pichu'],
        megaevolution: false,
        gigantamax: true,
        dynamax: true,
    }

    return(
        <div>
            <PokemonContext.Provider
                value={someData}
            >
                <Pokemon />
            </PokemonContext.Provider>
        </div>
    )
}

const Pokemon = () => {
    const data = React.useContext(PokemonContext)
    console.log(data)
    return(
        <div>
            <p>Pokemon name: {data.name}</p>
            <p>Attacks</p>
            <Moves />
            <EvolutionLine/>
        </div>

    )
}

const Moves = () => {
    const data = React.useContext(PokemonContext)

    return(
        <ul>
            {
                data.attacks.map(attack => (
                    <li>
                        {attack}
                    </li>
                ))
            }
        </ul>

    )
}

const EvolutionLine = () => {
    const data = React.useContext(PokemonContext)

    return(
        <div>
            <p> Preevolutions: </p>
            <ul>
                {
                    data.pre_evolutions.map(item => (
                        <li>{item}</li>
                    ))
                }
            </ul>
            <p> Evolutions: </p>
            <ul>
                {
                    data.evolutions.map(item => (
                        <li>{item}</li>
                    ))
                }
            </ul>
            Extra data:
            <ExtraData/>
        </div>
    )
}

const ExtraData = () => {
    const data = React.useContext(PokemonContext)

    return(
        <div>
            This pokemon:
            <ul>
                <li>{ data.megaevolution ? 'Has mega' : 'Han no mega'}</li>   
                <li>{ data.dynamax ? 'Has dynamax' : 'Han no dynamax'}</li> 
                <li>{ data.gigantamax ? 'Has gigantamax' : 'Han no gigantamax'}</li> 
            </ul>
        </div>
    )
}

export default TestingProvider

/* This way we can share global data easely. A common use case is sharing a UI state with other components */