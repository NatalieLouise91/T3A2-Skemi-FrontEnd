//import required dependencies and components
import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { getAdminById } from "../../services/userServices.js";
// "../services/userServices";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useGlobalState } from "../../utils/stateContext.js";

// function renders links in nav bar when user is logged in
const LoggedInTab = ({ loggedInUser, handleLogout }) => {
   //initializes state for admin and nav item components
   const [admin, setAdmin] = useState(null);
   const [displayComponent, setDisplayComponent] = useState(false);

   // destructures store and user objects from global state
   const { store } = useGlobalState();
   const { users } = store;
   const adminUser = 1;

   // side effect to set display components in navbar links
   //  and return the admin record by id from the database
   useEffect(() => {
      setDisplayComponent(true);
      getAdminById(adminUser)
         .then((user) => setAdmin(user))
         .catch((error) => console.log(error));
   }, [adminUser]);

   // if the user is not an admin the component will not return of render
   if (!admin) return null;

   // renders links based on users admin rights
   return (
      <>
         {loggedInUser === admin.email ? (
            <ButtonGroup variant="text" color="inherit">
               <Button
                  size="large"
                  component={Link}
                  to="/create-event"
                  style={{ marginRight: 10 }}
               >
                  Create an Event
               </Button>
               <Button
                  size="large"
                  component={Link}
                  to="/create-roster"
                  style={{ marginRight: 10 }}
               >
                  Create a Roster
               </Button>
               <Button
                  size="large"
                  component={Link}
                  to="/event-schedule"
                  style={{ marginRight: 10 }}
               >
                  Event's Schedule
               </Button>
               {/* maps over users and returns the user id to navigate to the users
               profile */}
               {displayComponent &&
                  users.map((user) =>
                     user.email === loggedInUser ? (
                        <Button component={Link} to={`/users/${user.id}`}>
                           <PersonOutlineOutlinedIcon />
                           My Profile
                        </Button>
                     ) : null
                  )}
            </ButtonGroup>
         ) : (
            <ButtonGroup variant="text" color="inherit">
               <Button
                  size="large"
                  component={Link}
                  to="/event-schedule"
                  style={{ marginRight: 10 }}
               >
                  Event's Schedule
               </Button>

               {/* maps over users and returns the user id to navigate to the users
               profile */}
               {displayComponent &&
                  users.map((user) =>
                     user.email === loggedInUser ? (
                        <Button component={Link} to={`/users/${user.id}`}>
                           <PersonOutlineOutlinedIcon />
                           My Profile
                        </Button>
                     ) : null
                  )}
                  
            </ButtonGroup>
         )}

         <div style={{ flexGrow: 1 }} />

         <Button
            style={{ color: "inherit" }}
            size="large"
            endIcon={<LogoutIcon />}
            onClick={handleLogout}
         >
            Logout
         </Button>
      </>
   );
};

export default LoggedInTab;
