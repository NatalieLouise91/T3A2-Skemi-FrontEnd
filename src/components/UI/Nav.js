//import required dependencies and components
import React, { useState, useEffect } from "react";
import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   useMediaQuery,
   Button,
   Menu,
   MenuItem,
   ListItemIcon,
} from "@material-ui/core";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { signOut } from "../../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useGlobalState } from "../../utils/stateContext";
import { getAdminById } from "../../services/userServices";

import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@material-ui/icons/Menu";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import LoggedInTab from "./LoggedInTab";
import Spinner from "./Spinner";

// sets mui theme for component
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      marginBottom: 75,
   },
   menuButton: {
      marginRight: theme.spacing(2),
      color: "white",
   },
   title: {
      flexGrow: 1,
   },
}));

// nav function returns and renders the navbar with functionality
//  for mobile responsiveness and associated links
const Nav = ({ loggedInUser, logout, props }) => {
   const navigate = useNavigate();

   //Mui
   const classes = useStyles();
   const theme = useTheme();

   // sets state for hamburger menu functionality to show and unshow
   //  menu items on state
   const [anchor, setAnchor] = React.useState(null);
   const open = Boolean(anchor);

   //destructuring and initilaizing store and user object from global state
   const { store } = useGlobalState();
   const { users } = store;

   // setting the display component state
   const [displayComponent, setDisplayComponent] = useState(false);

   // setting the display spinner state
   const [displaySpinner, setDisplaySpinner] = useState(false);

   // varibale to store screen breakpoints for mobile responsiveness
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   //sets admin state
   const [admin, setAdmin] = useState(null);
   const adminUser = 1;

   //functionss to set anchor state
   const handleMenu = (event) => {
      setAnchor(event.currentTarget);
   };

   // handles logout button by signing the user out of the app
   const handleLogout = async (event) => {
      event.preventDefault();
      await signOut();
      navigate(`/login`);
      logout();
      setAnchor(null);
   };

   // useEffect to set the interval for rendering the component
   useEffect(() => {
      setInterval(() => {
         setDisplayComponent(true);
      }, 5000);
   }, []);

   // useEffect to set the interval for rendering the spinner
   useEffect(() => {
      let time = 5;
      const timeValue = setInterval((interval) => {
         setDisplaySpinner(true);
         time = time - 1;
         if (time <= 0) {
            clearInterval(timeValue);
            setDisplaySpinner(false);
         }
      }, 1000);
   }, []);

   //side effect to return admin users from database
   useEffect(() => {
      getAdminById(adminUser)
         .then((user) => setAdmin(user))
         .catch((error) => console.log(error));
   }, [adminUser]);

   if (!admin) return null;

   //returns and renders navbar and loggintab component
   return (
      <div className={classes.root}>
         {/* <HideOnScroll {...props}> */}
         <AppBar>
            <Toolbar>
               <IconButton
                  color="inherit"
                  style={{ marginRight: 8 }}
                  component={Link}
                  to="/"
               >
                  <EventNoteIcon fontSize="large" />
               </IconButton>
               <Typography variant="h5">Skemi</Typography>
               <div style={{ flexGrow: 1 }} />

               {!isMobile && loggedInUser ? (
                  <LoggedInTab
                     loggedInUser={loggedInUser}
                     handleLogout={handleLogout}
                  />
               ) : !isMobile && !loggedInUser ? (
                  <Button
                     component={Link}
                     to="/login"
                     style={{ color: "inherit" }}
                     size="large"
                     endIcon={<LoginIcon />}
                  >
                     Login
                  </Button>
               ) : isMobile && loggedInUser ? (
                  <>
                     <IconButton
                        color="textPrimary"
                        className={classes.menuButton}
                        edge="start"
                        aria-label="menu"
                        onClick={handleMenu}
                     >
                        <MenuIcon />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchor}
                        anchorOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        KeepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        open={open}
                     >
                        <MenuItem
                           onClick={() => setAnchor(null)}
                           component={Link}
                           to="/"
                        >
                           <ListItemIcon>
                              <BallotOutlinedIcon />
                           </ListItemIcon>
                           <Typography variant="h6"> All Events</Typography>
                        </MenuItem>
                        {loggedInUser === admin.email && (
                           <MenuItem
                              onClick={() => setAnchor(null)}
                              component={Link}
                              to="/create-event"
                           >
                              <ListItemIcon>
                                 <BallotOutlinedIcon />
                              </ListItemIcon>
                              <Typography variant="h6">
                                 Create an Event
                              </Typography>
                           </MenuItem>
                        )}
                        {loggedInUser === admin.email && (
                           <MenuItem
                              onClick={() => setAnchor(null)}
                              component={Link}
                              to="/create-roster"
                           >
                              <ListItemIcon>
                                 <BallotOutlinedIcon />
                              </ListItemIcon>
                              <Typography variant="h6">
                                 {" "}
                                 Create a Roster
                              </Typography>
                           </MenuItem>
                        )}
                        <MenuItem
                           onClick={() => setAnchor(null)}
                           component={Link}
                           to="/event-schedule"
                        >
                           <ListItemIcon>
                              <BallotOutlinedIcon />
                           </ListItemIcon>
                           <Typography variant="h6">
                              Event's Schedule
                           </Typography>
                        </MenuItem>

                        {displaySpinner && (
                           <MenuItem>
                              <Spinner />
                           </MenuItem>
                        )}

                        {displayComponent &&
                           users.map((user) =>
                              user.email === loggedInUser ? (
                                 <MenuItem
                                    onClick={() => setAnchor(null)}
                                    component={Link}
                                    to={`/users/${user.id}`}
                                 >
                                    <ListItemIcon>
                                       <PersonOutlineOutlinedIcon />
                                    </ListItemIcon>
                                    <Typography variant="h6">
                                       {" "}
                                       My Profile
                                    </Typography>
                                 </MenuItem>
                              ) : null
                           )}
                        <MenuItem
                           onClick={handleLogout}
                           component={Link}
                           to="/"
                        >
                           <ListItemIcon>
                              <LogoutOutlinedIcon />
                           </ListItemIcon>
                           <Typography variant="h6"> Logout</Typography>
                        </MenuItem>
                     </Menu>
                  </>
               ) : isMobile && !loggedInUser ? (
                  <>
                     <IconButton
                        className={classes.menuButton}
                        edge="start"
                        aria-label="menu"
                        onClick={handleMenu}
                     >
                        <MenuIcon />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchor}
                        anchorOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        KeepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        open={open}
                     >
                        <MenuItem
                           onClick={() => setAnchor(null)}
                           component={Link}
                           to="/login"
                        >
                           <ListItemIcon>
                              <LoginOutlinedIcon />
                           </ListItemIcon>
                           <Typography variant="h6"> Login</Typography>
                        </MenuItem>
                        <MenuItem
                           onClick={() => setAnchor(null)}
                           component={Link}
                           to="/new-user"
                        >
                           <ListItemIcon>
                              <AppRegistrationOutlinedIcon />
                           </ListItemIcon>
                           <Typography variant="h6"> Register</Typography>
                        </MenuItem>
                     </Menu>
                  </>
               ) : null}
            </Toolbar>
         </AppBar>
         {/* </HideOnScroll> */}
      </div>
   );
};

export default Nav;
