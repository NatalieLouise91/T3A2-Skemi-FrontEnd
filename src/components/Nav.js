import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({loggedInUser, setLoggedInUser}) => {
    function logout(event) {
        event.preventDefault();
        setLoggedInUser("");
    }

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
                {loggedInUser?
            <ul>
                <li>{loggedInUser.first_name}</li>
                <li><Link to="/create-event">Create an Event</Link></li>
                <li><Link to="/event-schedule">Event Schedule</Link></li>
                <li><Link to="/home" onClick ={logout}>Logout</Link></li>
            </ul>
                :

            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/new-user">Register</Link></li>
            </ul>

                }
            
        </nav>
    )
}

export default Nav;
