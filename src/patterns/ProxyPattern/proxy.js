
const TestingProxy = () => {
    const trainer = {
        name: 'Alejandro',
        lastName: 'Pinto',
        age: 23, 
        trainer: true,
        pokemonTeam: [
            "Typhlosion",
            "Ampharos",
            "Pidgeot",
            "Raichu",
            "Dragonite",
            "Tentacruel"
        ]
    }
    
    const trainerProxy = new Proxy(trainer, {
        get: (obj, prop) => {
            return Reflect.get(obj, prop)
        },
        set: (obj, prop, value) => {
            if(prop === "pokemonTeam") {
                console.log("You can modify the pokemon team for now");
            } else {
                return Reflect.set(obj, prop, value)
            }
        }
    })

    return(
        <div>
            <p>
                Trainer Info:
            </p>
            <p>
                Trainer name: {trainerProxy.name}
            </p>
            <p>
                Trainer last name: {trainerProxy.lastName}
            </p>
            <p>
                Trainer age: {trainerProxy.age}
            </p>
            
                Your pokemon team is, {trainerProxy.pokemonTeam}
        </div>
    )

}

export default TestingProxy
