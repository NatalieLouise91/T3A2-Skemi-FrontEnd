//import required dependencies and components
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { Grid, Container } from "@material-ui/core";
import RosterCard from "./RosterCard";
import Spinner from "./Spinner";

// function returns and renders an mui component with roster information associated to an occasion
export default function RostersByOccasion() {
   const { id } = useParams();
   const { store } = useGlobalState();
   const { rosters } = store;
   const { users } = store;

   // setting the display component state
   const [displayComponent, setDisplayComponent] = useState(false);

   // setting the display spinner state
   const [displaySpinner, setDisplaySpinner] = useState(false);

   // useEffect to set the interval for rendering the component

   //side effect to wait on time to call setdisplay
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

   return (
      <Container>
         {displaySpinner && (
            <Grid
               container
               direction="column"
               justifyContent="center"
               alignItems="center"
            >
               <Spinner />
            </Grid>
         )}

         {displayComponent && (
            <Grid container spacing={3}>
               {rosters.map((roster) =>
                  roster.event_id === id ? (
                     <Grid key={roster.id} item xs={12} sm={6} md={3}>
                        <RosterCard roster={roster} />
                     </Grid>
                  ) : null
               )}
            </Grid>
         )}
         {console.log(users)}
      </Container>
   );
}
