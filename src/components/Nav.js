// IMPORTING APIS
import React from "react";
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
   CssBaseline,
   makeStyles,
   useTheme
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Logout } from '@mui/icons-material';

// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      padding: 30,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
}));

function HideOnScroll(props) {
   const { children } = props;
   const trigger = useScrollTrigger();
   return (
      <Slide appear={false} direction={"down"} in={!trigger}>
         {children}
      </Slide>
   );
}

    function logout(event) {
        event.preventDefault();
        logout(loggedInUser)
        .then(() => {
            // dispatch({type: 'setLoggedInUser', data: null})
            // dispatch({type: 'setToken', data: null})
    })
        setLoggedInUser("");
    }
    
    const classes = useStyles();


const Header = (props) => {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };
   return (
      <div className={classes.root}>
         <HideOnScroll {...props}>
            {/* <BrowserRouter> */}
            <AppBar>
               <Toolbar>
                  <Typography
                     variant="h5"
                     component="p"
                     color="textSecondary"
                     className={classes.title}
                  >
                     Skemi
                  </Typography>
                  {isMobile ? (
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
                           anchorEl={anchorEl}
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
                              onClick={() => setAnchorEl(null)}
                              component={Link}
                              to={process.env.PUBLIC_URL + "/"}
                           >
                              <ListItemIcon>
                                 <HomeIcon />
                              </ListItemIcon>
                              <Typography variant="h6"> Home</Typography>
                           </MenuItem>

                           <MenuItem
                              onClick={() => setAnchorEl(null)}
                              component={Link}
                              to={process.env.PUBLIC_URL + "/login"}
                           >
                              <ListItemIcon>
                                 <PermIdentityOutlinedIcon />
                              </ListItemIcon>
                              <Typography variant="h6"> Login</Typography>
                           </MenuItem>
                           <MenuItem
                              onClick={() => setAnchorEl(null)}
                              component={Link}
                              to={process.env.PUBLIC_URL + "/new-user"}
                           >
                              <ListItemIcon>
                                 <PersonAddOutlinedIcon />
                              </ListItemIcon>
                              <Typography variant="h6"> Register </Typography>
                           </MenuItem>
                        </Menu>
                     </>
                  ) : (
                     <div style={{ marginRight: "2rem" }}>
                        <Button
                           variant="text"
                           color="default"
                           component={Link}
                           to={process.env.PUBLIC_URL + "/"}
                           onClick={() => setAnchorEl(null)}
                        >
                           <HomeIcon />
                           Home
                        </Button>

                        <Button
                           variant="text"
                           color="default"
                           component={Link}
                           onClick={() => setAnchorEl(null)}
                           to={process.env.PUBLIC_URL + "/login"}
                        >
                           <PermIdentityOutlinedIcon />
                           Login
                        </Button>
                        <Button
                           variant="text"
                           color="default"
                           component={Link}
                           onClick={() => setAnchorEl(null)}
                           to={process.env.PUBLIC_URL + "/new-user"}
                        >
                           <PersonAddOutlinedIcon />
                           Register
                        </Button>
                     </div>
                  )}
               </Toolbar>
            </AppBar>
         </HideOnScroll>
      </div>
   );
};

export default Header;