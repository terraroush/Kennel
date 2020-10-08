import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
    const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    //for edit, hold on to state of animal in this view
    const [animal, setAnimal] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {animalId} = useParams();
	const history = useHistory();
    
    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newAnimal = { ...animal }
        //animal is an object with properties. 
        //set the property to the new value
        newAnimal[event.target.name] = event.target.value
        //update state
        setAnimal(newAnimal)
    }
    
    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
        getCustomers().then(getLocations).then(()=> {
            if (animalId){
                getAnimalById(animalId)
                .then(animal => {
                    setAnimal(animal)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])
    
    const constructAnimalObject = () => {
        if (parseInt(animal.locationId) === 0) {
            window.alert("Please select a location")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true);
            if (animalId){
                //PUT - update
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                .then(() => history.push(`/animals/detail/${animal.id}`))
            }else {
                //POST - add
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                .then(() => history.push("/animals"))
            }
        }
    }
    
    return (
        <form className="animalForm">
            <h2 className="animalForm__title">{animalId ? "Edit Animal" : "Add Animal"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" id="animalName" name="name" required autoFocus className="form-control" 
                    placeholder="Animal name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={animal.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalBreed">Animal breed: </label>
                    <input type="text" id="animalBreed" name="breed" className="form-control" 
                    placeholder="Breed" 
                    onChange={handleControlledInputChange} 
                    defaultValue={animal.breed}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={animal.locationId} name="locationId" id="animalLocation" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Customer: </label>
                    <select value={animal.customerId} name="customerId" id="customerAnimal" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructAnimalObject()
                }}>
            {animalId ? "Save Animal" : "Add Animal"}</button>
        </form>
    )
}









// import React, { useContext, useRef, useEffect } from "react"
// import { LocationContext } from "../location/LocationProvider"
// import { AnimalContext } from "../animal/AnimalProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
// import "./Animal.css"
// import { useHistory } from 'react-router-dom';

// export const AnimalForm = (props) => {
//     const { addAnimal } = useContext(AnimalContext)
//     const { locations, getLocations } = useContext(LocationContext)
//     const { customers, getCustomers } = useContext(CustomerContext)

//     /*
//         Create references that can be attached to the input
//         fields in the form. This will allow you to get the
//         value of the input fields later when the user clicks
//         the save button.

//         No more `document.querySelector()` in React.
//     */
//     const name = useRef(null)
//     const breed = useRef(null)
//     const location = useRef(null)
//     const customer = useRef(null)

//     /*
//         Get animal state and location state on initialization.
//     */
//     useEffect(() => {
//        getCustomers().then(getLocations)
//     }, [])

//     const constructNewAnimal = () => {
//         /*
//             The `location` and `customer` variables below are
//             the references attached to the input fields. You
//             can't just ask for the `.value` property directly,
//             but rather `.current.value` now in React.
//         */
//         const locationId = parseInt(location.current.value)
//         const customerId = parseInt(customer.current.value)

//         if (locationId === 0) {
//             window.alert("Please select a location")
//         } else {
//             addAnimal({
//                 name: name.current.value,
//                 breed: breed.current.value,
//                 locationId,
//                 customerId
//             })
//             .then(() => history.push("/animals"))
//         }
//     }

//     const history = useHistory();

//     return (
//         <form className="animalForm">
//             <h2 className="animalForm__title">New Animal</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="animalName">Animal name: </label>
//                     <input type="text" id="animalName" ref={name} required autoFocus className="form-control" placeholder="Animal name" />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="animalBreed">Breed: </label>
//                     <input type="text" id="animalBreed" ref={breed} className="form-control" placeholder="Breed" />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="location">Assign to location: </label>
//                     <select defaultValue="" name="location" ref={location} id="animalLocation" className="form-control" >
//                         <option value="0">Select a location</option>
//                         {locations.map(l => (
//                             <option key={l.id} value={l.id}>
//                                 {l.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="customer">Customer: </label>
//                     <select defaultValue="" name="customer" ref={customer} id="customerAnimal" className="form-control" >
//                         <option value="0">Select a customer</option>
//                         {customers.map(c => (
//                             <option key={c.id} value={c.id}>
//                                 {c.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </fieldset>
//             <button type="submit"
//                 onClick={evt => {
//                     evt.preventDefault() // Prevent browser from submitting the form
//                     constructNewAnimal()
//                 }}
//                 className="btn btn-primary">
//                 Save Animal
//             </button>
//         </form>
//     )
// }