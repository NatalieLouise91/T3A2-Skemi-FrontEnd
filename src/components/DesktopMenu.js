import React from 'react';
import { Link } from 'react-router-dom';

import {
    Typography,
    makeStyles,
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

const DesktopMenu = ({loggedInUser, setLoggedInUser}) => {
    function logout(event) {
        event.preventDefault();
        setLoggedInUser("");
    }
     
    const classes = useStyles();

    return (
        <>
            <div className={classes.navlinks}>
                <Link to="/" className={classes.link}>Home</Link>
            </div>
                {loggedInUser?
            <div className={classes.navlinks}>
                <Typography>{loggedInUser.first_name}</Typography>
                <Link to="/create-event" className={classes.link}>Create an Event</Link>
                <Link to="/event-schedule" className={classes.link}>Event Schedule</Link>
                <Link to="/home" className={classes.link} onClick ={logout}>Logout</Link>
            </div>
                :
            <div className={classes.navlinks}>
                <Link to="/login" className={classes.link}>Login</Link>
                <Link to="/new-user" className={classes.link}>Register</Link>
            </div>
            }
        </>
    )
}

export default DesktopMenu();