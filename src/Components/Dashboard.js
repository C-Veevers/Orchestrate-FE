import "../Styling/Dashboard.css"
import { Events } from './Events'
import { UserVenue } from "./UserVenue";
import { UserGroups } from './UserGroups';
import { Header } from './Header'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";

export function Dashboard() {
    const { loggedUser, isLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()
    if (!isLoggedIn) {
        return (<><h1>Unauthorised Access</h1><br /><p>Please <Link to="/login">Login</Link></p></>)
    } else {
        return (
            <div>
                <Header />
                <h1>Dashboard</h1>
                <UserGroups />
                <Events />
                <UserVenue />
            </div>
        );
    }
}
