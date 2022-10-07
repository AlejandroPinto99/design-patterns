/* Prototype Patter: Share properties among many objects of the same type

    Is useful when we want to share properties among many objects of the same type. The prototype is an
    object that's native to JavaScript, and can be accessed by objects through the prototype chain
*/
class Pokemon {
    constructor(name) {
        this.name = name
    }

    eat() {
        return 'eating'
    }
}

class Pikachu extends Pokemon {
    constructor(name){
        super(name);
    }

    attack() {
        return  `${this.name} Attacks with Thunder!`
    }
}


const TestingPrototype = () => {
    const pokemon1  = new Pokemon("Pikachu")

    console.log(Pokemon.prototype) //Prototype direct from class
    console.log(pokemon1.__proto__) // Prototype from the  instance, __proto__ makes reference to the
    // constructor's class

    // Adding new property to the prototype

    Pokemon.prototype.train = () => console.log("Training")

    pokemon1.train();

    const Sparky = new Pikachu('Sparky');

    console.log(Sparky.__proto__, "1 proto")
    console.log(Sparky.__proto__.__proto__, "2 proto")
    
    // Object.create() lets us create an object , to which we can explicity pass the value of its prototype.

    const pokemon2 = Object.create(Sparky)

    console.log({pokemon2})
    console.log("Pokemon2",pokemon2.eat())
    console.log(Object.keys(pokemon2)) // pokemon2 does not have properties it self
    console.log(pokemon2.__proto__.__proto__.__proto__)
    console.log(Object.keys(pokemon2.__proto__)) // But is has access to the prototype chain!

    return(
        <p>
            Check the console
        </p>
    )
}

export default TestingPrototype