import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import {
   Grid,
   Container,
   Paper,
   Typography,
} from "@material-ui/core";
import Roster from "./Roster";
import Spinner from "./Spinner";
import User from "./User";

export default function EventSchedule() {

    const { id } = useParams();
    const { store } = useGlobalState();
    const { rosters } = store;
    const { users } = store;
    const { occasions } = store;

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

    // const teamMembers = users.map(user => user.first_name + ' ' + user.last_name)


    return (
        
        <Container> 

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
            >
                <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={5} style={{ padding: 24, marginTop: 24 }}>
                        <Typography variant="h3">Event Schedule</Typography>
                    </Paper>
                </Grid>
            </Grid>
            
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
            >
                {users.map((user, index) => (
                <Grid item key={index} xs={12} md={6} lg={4}>
                    < User user={user} />
                </Grid>
                ))}
            </Grid>
            {console.log(users)}

            </Container>
            }
        </Container>
    )
}


