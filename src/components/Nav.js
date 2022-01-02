// IMPORTING APIS
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    ButtonGroup
} from '@material-ui/core';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { signOut } from '../services/authServices'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

const Nav = ({ loggedInUser, logout }) => {
  const handleLogout = async event => {
    event.preventDefault()
    await signOut()
    logout()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          style={{marginRight: 8}}
          // component={Link}
          // to='/'
        >
          <a href='/' style={{ color: 'white' }}><EventNoteIcon fontsize='large' /></a>
        </IconButton>
        <Typography variant="h5">Skemi</Typography>
        <div style={{ flexGrow: 1 }} />
        {loggedInUser && <LoggedInTab loggedInUser={loggedInUser} handleLogout={handleLogout} />}
        {!loggedInUser && (
          <Button 
            // component={Link}
            // to='/login'
            style={{ color: "inherit" }}
            size='large'
            endIcon={<LoginIcon />}
          >
            <a href='/login' style={{ color: 'white' }}>Login</a>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Nav;

const LoggedInTab = ({ loggedInUser, handleLogout }) => {
  return (
    <>
      <ButtonGroup variant='text' color='inherit'>
        <Button 
          size='large'
          // component={Link}
          // to='/create-event'
          style={{ marginRight: 10 }}
        >
          <a href='/create-event' style={{ color: 'white' }}>Create an Event</a>
        </Button>
        <Button 
          size='large'
          // component={Link}
          // to='/event-schedule'
          style={{ marginRight: 10 }}
        >
          <a href='/event-schedule' style={{ color: 'white' }}>Schedule Event</a>
        </Button>
      </ButtonGroup>

      <div style={{ flexGrow: 1 }} />
      
      <Typography style={{ marginRight: 20 }}>
        {loggedInUser}
      </Typography>
      <Button 
        style={{ color: "inherit" }}
        size='large'
        endIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  )
}

