import React from 'react'
import { Link } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

const Roster = ({ roster }) => {
    return (
        <>
         <Container>
            <Link
                  to={`/rosters/${roster.id}`}
                  style={{ textDecoration: "none" }}
               >
                <Typography align="center" variant="h5">
                {roster.first_name}
                </Typography>
                <p>{roster.start_time}-{roster.end_time}</p>
            </Link>    
         </Container>
        </>
   );
};

export default Roster;
