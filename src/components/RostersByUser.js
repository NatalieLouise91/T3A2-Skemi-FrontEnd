import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import {
   Grid,
   Container,
} from "@material-ui/core";
import UserRosterCard from "./UserRosterCard";
import Spinner from "./Spinner";

export default function RostersByUser() {

    const { id } = useParams();
    const { store } = useGlobalState();
    const { rosters } = store;
    const { occasions } = store;

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

            <>

            <Grid container spacing={4}>
                    { rosters.map((roster) =>
                    roster.user_id == id?
                            <Grid key={roster.id} item xs={12} sm={6} md={3}>
                                <UserRosterCard roster={roster} />
                            </Grid>

                    : null
                )
                }
            </Grid>

            </>
            
            }

        </Container>
    )
}