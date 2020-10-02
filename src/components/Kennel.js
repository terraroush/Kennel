import React from "react";
import "./Kennel.css";
import { AnimalCard } from "./animal/AnimalCard";
import { EmployeeCard } from "./employee/EmployeeCard";
import { CustomerCard } from "./customer/CustomerCard";
import { LocationCard } from "./location/LocationCard";
import "./animal/Animal.css";
import "./customer/Customer.css";
import "./employee/Employee.css";
import "./location/Location.css";

export const Kennel = () => (
    <>
        <h2>Nashville Kennels</h2>
        <small>Loving care when you're not there.</small>
        <address>
            <div>Visit Us at the Nashville North Location</div>
            <div>500 Puppy Way</div>
        </address>

        <h2>Animals</h2>
        <article className="animals">
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
        </article>
        <h2>Employees</h2>
        <article className="employees">
            <EmployeeCard />
            <EmployeeCard />
            <EmployeeCard />
        </article>
        <h2>Locations</h2>
        <article className="locations">
            <LocationCard />
            <LocationCard />
        </article>
        <h2>Customers</h2>
        <article className="customers">
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
        </article>
    </>
)