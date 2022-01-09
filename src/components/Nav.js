// IMPORTING APIS
import React, {useState, useEffect } from "react";
import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   useMediaQuery,
   Button,
   useScrollTrigger,
   Slide,
   Menu,
   MenuItem,
   ListItemIcon,
} from "@material-ui/core";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { signOut } from "../services/authServices";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@material-ui/icons/Menu";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import { Link, useNavigate } from "react-router-dom";
import LoggedInTab from "./LoggedInTab";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getUsers } from "../services/userServices";
import { getUserByEmail } from "../services/userServices";
import {useGlobalState} from '../utils/stateContext';
import Spinner from "./Spinner";

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

// function HideOnScroll(props) {
//    const { children } = props;
//    const trigger = useScrollTrigger();

//    return (
//       <Slide appear={false} direction={"down"} in={!trigger}>
//          {children}
//       </Slide>
//    );
// }

const Nav = ({ loggedInUser, logout, props }) => {
   const navigate = useNavigate();

   const classes = useStyles();
   const [anchor, setAnchor] = React.useState(null);
   const open = Boolean(anchor);
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const handleMenu = (event) => {
      setAnchor(event.currentTarget);
   };

   const handleLogout = async (event) => {
      event.preventDefault();
      await signOut();
      navigate(`/login`);
      logout();
      setAnchor(null);
   };

   const { store } = useGlobalState();
   const { users } = store; 

   // setting the display component state
   const [displayComponent, setDisplayComponent] = useState(false);

// setting the display spinner state
   const [displaySpinner, setDisplaySpinner] = useState(false);

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
    }, 1000); },[]);

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
                  <EventNoteIcon fontsize="large" />
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

                        {displaySpinner && 
                          <MenuItem>
                            <Spinner />
                          </MenuItem>
                        }
            
                      {displayComponent &&

                          users.map((user) => 
                              user.email === loggedInUser? 
                              <MenuItem 
                                onClick={() => setAnchor(null)}
                                component={Link}
                                to= {`/users/${user.id}`}
                              >
                              <ListItemIcon>
                                  <PersonOutlineOutlinedIcon />
                              </ListItemIcon>
                              <Typography variant="h6"> My Profile</Typography>
                            </MenuItem>
                         : null )
                        }
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
                        color="red"
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
