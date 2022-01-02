import React from "react";
import Occasion from "./Occasion";
import { useGlobalState } from "../utils/stateContext";
import { Grid, Paper } from "@material-ui/core";

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
