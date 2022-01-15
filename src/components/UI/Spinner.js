//import required dependencies and components
import React, { useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography, Grid, Paper } from "@material-ui/core";
import { init } from "ityped";


// functional component that returns and renders mui components for a loading spinner graphic
//  to display when app is interacting with the database and render times are slow
export default function Spinner() {
   const textRef = useRef();

   //side effect to handle display
   useEffect(() => {
      init(textRef.current, {
         showCursor: false,
         strings: ["Loading..."],
      });
   }, []);

   return (
      <Paper
         spacing={2}
         elevation={5}
         style={{ padding: 24, marginTop: 25, width: "70%", height: "70%" }}
      >
         <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
         >
            <Grid>
               <div>
                  <Box sx={{ display: "flex" }}>
                     <CircularProgress />
                  </Box>
               </div>
            </Grid>
            <Grid>
               <Typography variant="h6">
                  <span ref={textRef}></span>
               </Typography>
            </Grid>
         </Grid>
      </Paper>
   );
}
