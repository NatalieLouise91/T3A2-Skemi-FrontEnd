//import required dependencies and components
import React, { useEffect, useReducer, useState } from "react";
import Occasions from "./Occasions";
import stateReducer from "../../utils/stateReducer";
import { StateContext } from "../../utils/stateContext";
import { getOccasions } from "/Users/jordanhardy/Documents/coder/skemi/T3A2-Skemi-FrontEnd/src/services/occasionServices.js";
import {
   Container,
   Typography,
   Button,
   CssBaseline,
   Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAdminById } from "/Users/jordanhardy/Documents/coder/skemi/T3A2-Skemi-FrontEnd/src/services/userServices.js";

//occasion list function renders a page with a list of the occasions 
// returned from the database
const OccasionList = ({ loggedInUser }) => {

   // sets initial state variable
   const initialState = {
      occasions: [],
   };
// destructures variables for reducer hook
   const [store, dispatch] = useReducer(stateReducer, initialState);

   //side effect to get occasions from database
   useEffect(() => {
      // this function is declared in ../services/occasionServices
      getOccasions()
         .then((events) => {
            dispatch({
               type: "setOccasions",
               data: events,
            });
            console.log(events);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   //destructures variables for state initialized with null for adminuser
   const [admin, setAdmin] = useState(null);
   const adminUser = 1;

   // gets user admins from database
   useEffect(() => {
      getAdminById(adminUser)
         .then((user) => setAdmin(user))
         .catch((error) => console.log(error));
   }, [adminUser]);

   if (!admin) return null;

   // returns mui components rendering a list of occasions 
   return (
      <>
         <CssBaseline />
         <StateContext.Provider value={{ store, dispatch }}>
            <Container maxWidth="lg">
               <Typography
                  variant="h4"
                  align="center"
                  style={{ padding: 24, marginTop: 5 }}
               >
                  Upcoming Events
               </Typography>
               {/* hides crud operations if user is not an admin */}
               {loggedInUser === admin.email && (
                  <Link to="/create-event" style={{ textDecoration: "none" }}>
                     <Button type="submit" variant="contained" color="primary">
                        Create Event
                     </Button>
                  </Link>
               )}
               <Grid spacing={10}>
                  <Grid item>
                     <Occasions />
                  </Grid>
               </Grid>
            </Container>
         </StateContext.Provider>
      </>
   );
};

export default OccasionList;
