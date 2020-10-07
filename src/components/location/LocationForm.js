import React, { useContext, useRef } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"
import { useHistory } from 'react-router-dom';

export const LocationForm = (props) => {
    const { addLocation } = useContext(LocationContext)
    const history = useHistory()

    const name = useRef(null)
    const location = useRef(null)

    const constructNewLocation = () => {

            addLocation({
                name: name.current.value,
                address: location.current.value
            })
            .then(() => history.push("/locations"))
        }

    return (
        <form className="locationForm">
            <h2 className="locationForm">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationName">Kennel name: </label>
                    <input type="text" id="locationName" ref={name} required autoFocus className="form-control" placeholder="Kennel name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationAddress">Address: </label>
                    <input type="text" id="locationAddress" ref={location} required autoFocus className="form-control" placeholder="Address" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewLocation()
                }}
                className="btn btn-primary">
                Save Location
            </button>
        </form>
    )

}