import React from "react";
import Occasion from "./Occasion";
import { useGlobalState } from "../utils/stateContext";
import { Grid, Paper } from "@material-ui/core";

const Occasions = () => {
   const { store } = useGlobalState();
   const { occasionList } = store;

   console.log(store);

   return (
      <>
         <Grid container>
            {occasionList.map(
               (occasion, index) => (
                  <Grid item key={index} xs={12} md={6} lg={4}>
                     <Paper><Occasion occasion={occasion} /></Paper>
                  </Grid>
               )
            )}
         </Grid>
      </>
   );
};

export default Occasions;