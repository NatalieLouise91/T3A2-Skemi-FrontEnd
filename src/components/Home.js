import React, { useEffect, useReducer } from "react";
import Occasions from "./Occasions";
import stateReducer from "../utils/stateReducer";
import { StateContext } from "../utils/stateContext";
import { getOccasions } from "../services/occasionServices";
import {
   Container,
   Typography,
   Button,
   CssBaseline,
   Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = () => {
   const initialState = {
      occasionList: [],
   };

   const [store, dispatch] = useReducer(stateReducer, initialState);
   // const { occasionList } = store;

   useEffect(() => {
      // this function is declared in ../services/occasionServices
      getOccasions()
         .then((events) => {
            dispatch({
               type: "setOccasionList",
               data: events,
            });
            console.log(events);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <>
         <CssBaseline />
         <StateContext.Provider value={{ store, dispatch }}>
            <Container maxWidth="sm">
               <Typography variant="h4" textAlign="center">
                  Upcoming Events
               </Typography>
               <Link to="/create-event" style={{ textDecoration: "none" }}>
                  <Button type="submit" variant="contained" color="primary">
                     Create Event
                  </Button>
               </Link>
               <Occasions />
            </Container>
         </StateContext.Provider>
      </>
   );
};

export default Home;
