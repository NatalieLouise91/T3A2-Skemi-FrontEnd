import React, {useEffect, useState } from 'react';
import Roster from './Roster';
import { useGlobalState } from '../utils/stateContext';
import { Grid, Paper } from "@material-ui/core";
import Spinner from "./Spinner";


export default function Rosters() {
    const {store} = useGlobalState();
    const {rosters} = store;

    // setting the display component state
   const [displayComponent, setDisplayComponent] = useState(false);

   // setting the display spinner state
      const [displaySpinner, setDisplaySpinner] = useState(false);
   
   // useEffect to set the interval for rendering the component
   
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
       }, 1000); },[]);

    return (

        <div>

        {displaySpinner && 
            
                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center" 
                    alignItems="center"
                >
                    <Spinner />
                </Grid>
            
            }

        {displayComponent && 
        
        <Grid container spacing={2}>
            {rosters.map((roster, index) => {
                return (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Paper style={{ padding: 24, marginTop: 24 }} elevation={5}>
                            
                            <Roster index={index} roster={roster} />
                            
                        </Paper>
                    </Grid>                 
                )
            })}
        </Grid> 
        }
        </div>       
    )
}