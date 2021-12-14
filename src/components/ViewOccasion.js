import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
   CssBaseline,
   Container,
   Paper,
   Typography,
   Grid,
} from "@material-ui/core";
import { getOccasionById, deleteOccasion } from "../services/occasionServices";
import { useGlobalState } from "../utils/stateContext";

import { Button } from "@material-ui/core";

const ViewOccasion = () => {
   const { dispatch } = useGlobalState();
   // const { loggedInUser } = store;
   const [occasion, setOccasion] = useState();
   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      getOccasionById(id)
         .then((occasion) => setOccasion(occasion))
         .catch((error) => console.log(error));
   }, [id]);

   function removeOccasion(e) {
      e.preventDefault();
      deleteOccasion(id)
         .then((occasion) => {
            dispatch({
               type: "deleteOccasion",
               data: id,
            });
            return navigate("/events");
         })

         .catch((error) => console.log(error));
   }

   return (
      <div>
         <CssBaseline></CssBaseline>
         {occasion ? (
            <>
               <Container>
                  <Container>
                     <Typography variant="h5">{occasion.name}</Typography>
                  </Container>
                  <Paper>
                     <Container >
                        <p>
                           <strong>Event Description:</strong>{" "}
                           {occasion.description}
                        </p>
                        <p>
                           <strong>Date:</strong> {occasion.date}
                        </p>
                        <p>
                           <strong>Attendees:</strong> {occasion.attendees}
                        </p>
                        <p>
                           <strong>Location:</strong> {occasion.location}
                        </p>
                        <p>
                           <strong>Time:</strong> {occasion.time}
                        </p>
                        <p>
                           <strong>Primary Contact:</strong>{" "}
                           {occasion.contact_name}
                        </p>
                        <p>
                           <strong>Primary Phone:</strong>{" "}
                           {occasion.contact_phone}
                        </p>
                     </Container>
                  </Paper>

                  <div>
                     <Grid container spacing={2} justify="center">
                        <Grid item>
                           <Button
                              size="small"
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={removeOccasion}
                           >
                              Delete Event
                           </Button>
                        </Grid>
                        <Grid item>
                           <Link
                              to="/"
                              style={{ textDecoration: "none" }}
                           >
                              <Button
                                 size="small"
                                 type="submit"
                                 variant="contained"
                                 color="primary"
                              >
                                 All Events
                              </Button>
                           </Link>
                        </Grid>
                     </Grid>
                  </div>
               </Container>
            </>
         ) : (
            <>
               <p>Invalid Event ID</p>
            </>
         )}
      </div>
   );
};

export default ViewOccasion;