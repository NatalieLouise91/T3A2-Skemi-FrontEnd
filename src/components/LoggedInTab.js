import React from "react";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const LoggedInTab = ({ loggedInUser, handleLogout }) => {
   return (
      <>
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
               to="/event-schedule"
               style={{ marginRight: 10 }}
            >
               Schedule Event
            </Button>
         </ButtonGroup>

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
