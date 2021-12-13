import React from 'react';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useTheme,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(5),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

const Nav = ({loggedInUser, setLoggedInUser}) => {

    function logout(event) {
        event.preventDefault();
        setLoggedInUser("");
    }
    
    const classes = useStyles();

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Skemi
                </Typography>

                <>
                <Typography><Link to="/">Home</Link></Typography>
                </>
                    {loggedInUser?
                <>
                    <Typography>{loggedInUser.first_name}</Typography>
                    <Typography><Link to="/create-event">Create an Event</Link></Typography>
                    <Typography><Link to="/event-schedule">Event Schedule</Link></Typography>
                    <Typography><Link to="/home" onClick ={logout}>Logout</Link></Typography>
                </>
                    :

                <>
                    <Typography><Link to="/login">Login</Link></Typography>
                    <Typography><Link to="/new-user">Register</Link></Typography>
                </>
                    }

            </Toolbar>
        </AppBar>
    )
}

export default Nav;
