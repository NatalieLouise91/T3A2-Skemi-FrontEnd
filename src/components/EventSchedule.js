import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import { useGlobalState } from "../utils/stateContext";
import {
    Grid,
    Container,
    Typography,
    Card,
    CardHeader,
    Box,
 } from "@material-ui/core";
 import Spinner from "./Spinner";
 import TeamEventSchedule from "./TeamEventSchedule";
 import { green, blueGrey } from '@mui/material/colors';


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

    const date = new Date(); 
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const currentDay = new Date(year, month, day)
    let dates = [];

    function getDates(startDate, daysToAdd) {
        
        for (let i = 0; i <= daysToAdd; i++) {
            let currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            dates.push((currentDate.getDate()) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear());
        }
    
        // return dates;
    }

    console.log(getDates(currentDay, 3));


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
                        <Typography variant="h3">
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
            spacing = {1}
        >
                
            <Grid item md={2}>
                <Card>
                </Card>
            </Grid>
                    {dates.map((date, index) =>
                        <Grid item key={index} item xs={12} sm={5} md={2}>
                            <Card
                                style={{
                                    bgcolor: green,
                             }}>
                                <CardHeader
                                    subheader={date}
                                />
                            </Card>
                        </Grid>
                        )
                    } 
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