import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { LocationCard } from "./location/LocationCard"
import { EmployeeCard } from "./employee/EmployeeCard"
import { AnimalList } from "./animal/AnimalList"
import { CustomerList } from "./customer/CustomerList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route path="/animals">
                    <AnimalList />
                </Route>
            </AnimalProvider>

            <Route path="/locations">
                <LocationCard />
            </Route>

            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>

            <Route path="/employees">
                <EmployeeCard />
            </Route>
        </>
    )
}