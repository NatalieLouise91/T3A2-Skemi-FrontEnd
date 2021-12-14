import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useTheme,
    Button
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
