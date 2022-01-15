//import required dependencies and components
import React from "react";
import Occasion from "./Occasion";
import { useGlobalState } from "../../utils/stateContext";
import { Grid, Paper } from "@material-ui/core";

// functional component to map through occasions on the database and return
//  and render the information on mui components
const Occasions = () => {
   const { store } = useGlobalState();
   const { occasions } = store;

   console.log(store);

   return (
      <>
         <Grid container spacing={1}>
            {occasions.map((occasion, index) => (
               <Grid item key={index} xs={12} md={6} lg={4}>
                  <Paper style={{ padding: 24, marginTop: 24 }} elevation={5}>
                     <Occasion occasion={occasion} />
                  </Paper>
               </Grid>
            ))}
         </Grid>
      </>
   );
};

export default Occasions;
