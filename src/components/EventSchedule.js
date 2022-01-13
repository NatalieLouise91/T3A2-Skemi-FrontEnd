import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import { useGlobalState } from "../utils/stateContext";
import {
    Grid,
    Container,
    Typography,
    Box,
 } from "@material-ui/core";
 import Spinner from "./Spinner";
 import TeamEventSchedule from "./TeamEventSchedule";


export default function EventSchedule() {

    // setting the display component state
   const [displayComponent, setDisplayComponent] = useState(false);

   // setting the display spinner state
      const [displaySpinner, setDisplaySpinner] = useState(false);
   
   // useEffect to set the interval for rendering the component
   
      useEffect(() => {
         setInterval(() => {
            setDisplayComponent(true);
         }, 10000);
      }, []);
   
   // useEffect to set the interval for rendering the spinner
       useEffect(() => {
           let time = 10;
           const timeValue = setInterval((interval) => {
               setDisplaySpinner(true);
               time = time - 1;
               if (time <= 0) {
                   clearInterval(timeValue);
                   setDisplaySpinner(false);
               }
       }, 1000); },[]);


    const { store } = useGlobalState();
    const { users } = store;

    console.log(users)

  return (
      <>

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

    <Container>
        <Grid 
            container
            direction="row" 
            justifyContent="center" 
            alignItems="center"
            spacing ={2}
        >
            <Grid item>
                <Box>
                    <Paper style={{ padding: 24, marginTop: 24 }} elevation={5}>
                        <Typography data-testid="header" variant="h3">
                            Event Schedule
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
        <Grid 
            container 
            direction="row" 
            justifyContent="center" 
            alignItems="center"
            spacing ={2}
        >
            {users.map((user) =>
                <Grid key={user.id} item xs={12} sm={12} md={12} lg={12}>
                    <TeamEventSchedule user={user} />
                </Grid>
                )
            }
                
        </Grid>

    </Container>
    }
    </>
  );
}