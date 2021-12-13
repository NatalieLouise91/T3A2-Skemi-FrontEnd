import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@mui/material';

const Nav = ({loggedInUser, setLoggedInUser}) => {
    function logout(event) {
        event.preventDefault();
        setLoggedInUser("");
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>Skemi</Typography>
                <ul>
                    <Typography><li><Link to="/">Home</Link></li></Typography>
                </ul>

                {loggedInUser
                    ?
                        <ul>
                            <Typography><li>{loggedInUser.first_name}</li></Typography>
                            <Button><Link to="/create-event">Create an Event</Link></Button>
                            <Typography><li><Link to="/event-schedule">Event Schedule</Link></li></Typography>
                            <Typography><li><Link to="/home" onClick ={logout}>Logout</Link></li></Typography>
                        </ul>
                    :
                        <ul>
                            <Typography><li><Link to="/login">Login</Link></li></Typography>
                            <Typography><li><Link to="/new-user">Register</Link></li></Typography>
                        </ul>

                }
            </Toolbar>
        </AppBar>
    )
}

export default Nav;
