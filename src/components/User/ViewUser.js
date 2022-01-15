//import required dependencies and components
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/userServices";
import RostersByUser from "../Roster/RostersByUser";
import { Container, Paper, Typography } from "@material-ui/core";

//function renders user information on user profile
export default function ViewUser() {
   const [user, setUser] = useState(null);
   const { id } = useParams();

   //side effect to get users by id
   useEffect(() => {
      getUserById(id)
         .then((user) => setUser(user))
         .catch((error) => console.log(error));
   }, [id]);

   if (!user) return null;

   //renders mui components with user record information
   return (
      <div>
         <Container>
            <Paper elevation={5} style={{ padding: 24, marginTop: 25 }}>
               <Container align="center">
                  <Typography
                     variant="h4"
                     style={{ padding: 5, marginTop: 25 }}
                  >
                     {user.first_name} {user.last_name}
                  </Typography>
               </Container>
            </Paper>
         </Container>
         <Container>
            <Paper elevation={5} style={{ padding: 24, marginTop: 25 }}>
               <Container align="center">
                  <Typography
                     variant="h5"
                     style={{ padding: 5, marginTop: 25 }}
                  >
                     Team Member Details
                  </Typography>
                  <Container>
                     <p>
                        <strong>Team Member ID: </strong>
                        {user.id}
                     </p>
                     <p>
                        <strong>Email: </strong>
                        {user.email}
                     </p>
                     <p>
                        <strong>Phone: </strong>
                        {user.phone}
                     </p>
                  </Container>
               </Container>
            </Paper>
         </Container>
         <Container>
            <Paper elevation={5} style={{ padding: 24, marginTop: 25 }}>
               <Container align="center">
                  <Typography variant="h5" style={{ padding: 5, margin: 25 }}>
                     Roster
                  </Typography>
                  <Container>
                     <RostersByUser />
                  </Container>
               </Container>
            </Paper>
         </Container>
      </div>
   );
}
