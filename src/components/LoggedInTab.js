import React, {useState, useEffect} from "react";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { getAdminById } from "../services/userServices";

const LoggedInTab = ({ loggedInUser, handleLogout }) => {
   
   const [admin, setAdmin] = useState(null);
   
   const adminUser = 1

   useEffect(() => {
      getAdminById(adminUser)
         .then((user) => setAdmin(user))
         .catch((error) => console.log(error));
   }, [adminUser]);

   if (!admin) return null;

   return (
      <>
         {loggedInUser === admin.email?
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
            </ButtonGroup>
            :
               <ButtonGroup variant="text" color="inherit">
                  <Button
                     size="large"
                     component={Link}
                     to="/event-schedule"
                     style={{ marginRight: 10 }}
                  >
                     Event's Schedule
                  </Button>
               </ButtonGroup>
            }

         <div style={{ flexGrow: 1 }} />

         <Typography style={{ marginRight: 20 }}>
            Welcome <strong>{loggedInUser}</strong> !
         </Typography>
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
