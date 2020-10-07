import React, { useState, createContext } from "react"

/*
    ANIMALCONTEXT IS THE BOSS--WHERE THE DATA ALL COMES FROM!!! The context is imported and used by individual components
    that need data
*/
export const AnimalContext = createContext()

/*
 This allows other components to use the data in the context. This provides to the context. This component establishes what data can be used.
 */
export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])

    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location&_expand=customer")
            .then(res => res.json())
            .then(setAnimals)
    }

    const getAnimalById = (id) => {
        return fetch(`http://localhost:8088/animals/${id}?_expand=location&_expand=customer`)
            .then(res => res.json())
    }

    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
            .then(getAnimals)
    }
    const releaseAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
            .then(getAnimals)
    }

    /*
        You return a context provider which has the
        `animals` state, the `addAnimal` function,
        and the `getAnimals` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, addAnimal, getAnimalById, releaseAnimal
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}