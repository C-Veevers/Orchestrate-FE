import "../Styling/Dashboard.css"
import { Events } from './Events'
import { UserVenue } from "./UserVenue";
import { UserGroups } from './UserGroups';
import { Header } from './Header'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";

export function Dashboard() {

    const { loggedUser, isLoggedIn } = useContext(UserContext)
    if (!isLoggedIn) {
        return (<><h1>Your session has timed out</h1><br /><p>Please <Link to="/login">Login</Link></p></>)
    } else {
        return (
            <>
                <Header />
                <div className="dashboard-component">

                    <h1>Welcome to Orchestrate, {loggedUser.name.first}!</h1>
                    <UserGroups />
                    <Events />
                    <UserVenue />
                </div>
            </>
        );
    }
}
