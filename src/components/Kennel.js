import React from "react";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import "./Kennel.css";
// import { AnimalCard } from "./animal/AnimalCard";
// import { EmployeeCard } from "./employee/EmployeeCard";
// import { CustomerCard } from "./customer/CustomerCard";
// import { LocationCard } from "./location/LocationCard";

export const Kennel = () => (
    <>
        <NavBar />
        <ApplicationViews />

     {/* <h2>Animals</h2>
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
        </article> */}
    </>
)