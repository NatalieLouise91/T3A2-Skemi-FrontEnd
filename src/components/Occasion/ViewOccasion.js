//import required dependencies and components
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
   CssBaseline,
   Container,
   Paper,
   Typography,
   Grid,
   Button,
} from "@material-ui/core";
import {
   getOccasionById,
   deleteOccasion,
} from "../../services/occasionServices.js";
import RostersByOccasion from "../Roster/RostersByOccasion";
import { useGlobalState } from "../../utils/stateContext";
import ConfirmDialog from "../UI/ConfirmDialog";

// function renders a specific occasion records information based on an id
const ViewOccasion = () => {
   //set state
   const [occasion, setOccasion] = useState();
   const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
   });

   //params for occasion record id from url
   const { id } = useParams();

   // set varibale to usenavigate
   const navigate = useNavigate();

   //destructuring dispatch and store called from global state
   const { store } = useGlobalState();
   const { loggedInUser } = store;

   //side effect to get occasions from database and return them by the id
   useEffect(() => {
      getOccasionById(id)
         .then((occasion) => setOccasion(occasion))
         .catch((error) => console.log(error));
   }, [id]);

   // if there are no occasion then end
   if (!occasion) return null;

   // function to handle deleting the occasion using the specific occasion id
   const onDelete = () => {
      deleteOccasion(id)
         .then(navigate("/"))
         .catch((error) => console.log(error));
      setConfirmDialog({
         ...confirmDialog,
         isOpen: false,
      });
      window.location.reload();
   };

   //renders a card for an occasion with relevant information from the database
   //  and buttons to delete the occasion and edit the occasion or go back to all events
   return (
      <div>
         <CssBaseline>
            <Container>
               <Container align="center">
                  <Typography
                     variant="h5"
                     style={{
                        padding: 5,
                        marginTop: 25,
                        fontWeight: 600,
                     }}
                  >
                     {occasion.name}
                  </Typography>
               </Container>
               <Paper elevation={5} style={{ padding: 24, marginTop: 25 }}>
                  <Container align="center">
                     <Typography
                        variant="h5"
                        style={{
                           padding: 5,
                           marginTop: 25,
                        }}
                     >
                        {occasion.event_name}
                     </Typography>
                  </Container>
                  <div>
                     <p>
                        <strong>Date: </strong> {occasion.date}
                     </p>
                     <p>
                        <strong>Attendees: </strong> {occasion.attendees}
                     </p>
                     <p>
                        <strong>Location: </strong> {occasion.location}
                     </p>
                     <p>
                        <strong>Time: </strong> {occasion.time}
                     </p>
                     <p>
                        <strong>Primary Contact: </strong>
                        {occasion.contact_name}
                     </p>
                     <p>
                        <strong>Primary Phone: </strong>
                        {occasion.contact_phone}
                     </p>
                     <p>
                        <strong>Event Description: </strong>{" "}
                        {occasion.description}
                     </p>
                  </div>

                  <Container style={{ padding: 24, marginTop: 25 }}>
                     {loggedInUser === occasion.author ? (
                        <Grid container spacing={2} justifyContent="center">
                           <Grid item>
                              <Button
                                 size="small"
                                 type="submit"
                                 variant="contained"
                                 color="primary"
                                 onClick={() => {
                                    // nested callback functions to display a confirm action modal 
                                    //  then navigate to update form
                                    setConfirmDialog({
                                       isOpen: true,
                                       title: "Are you sure you want to update this record?",
                                       subTitle:
                                          "You can't undo this operation",
                                       onConfirm: () => {
                                          navigate(`/events/update/${id}`);
                                       },
                                    });
                                 }}
                              >
                                 Edit Event
                              </Button>
                           </Grid>

                           <Grid item>
                              <Button
                                 size="small"
                                 type="submit"
                                 variant="contained"
                                 color="primary"
                                 onClick={() => {
                                    // nested callback functions to display a confirm action modal
                                    //  then navigate to update form
                                    setConfirmDialog({
                                       isOpen: true,
                                       title: "Are you sure you want to delete this record?",
                                       subTitle:
                                          "You can't undo this operation",
                                       onConfirm: () => {
                                          onDelete(id);
                                       },
                                    });
                                 }}
                              >
                                 Delete Event
                              </Button>
                           </Grid>

                           <Grid item>
                              <Link to="/" style={{ textDecoration: "none" }}>
                                 <Button
                                    size="small"
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                 >
                                    All Events
                                 </Button>
                              </Link>
                           </Grid>
                        </Grid>
                     ) : (
                        <Grid container spacing={2} justifyContent="center">
                           <Grid item>
                              <Link to="/" style={{ textDecoration: "none" }}>
                                 <Button
                                    size="small"
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                 >
                                    All Events
                                 </Button>
                              </Link>
                           </Grid>
                        </Grid>
                     )}
                  </Container>
               </Paper>
            </Container>

            <Container>
               <Paper elevation={5} style={{ padding: 24, marginTop: 25 }}>
                  <Container align="center">
                     <Typography
                        variant="h4"
                        style={{ padding: 5, marginTop: 25 }}
                     >
                        Roster
                     </Typography>
                     <Container>
                        <RostersByOccasion />
                     </Container>
                  </Container>

                  <Grid align="center">
                     {loggedInUser === occasion.author && (
                        <Link
                           to="/create-roster"
                           style={{ textDecoration: "none" }}
                        >
                           <Button
                              size="small"
                              type="submit"
                              variant="contained"
                              color="primary"
                              style={{ padding: 5, marginTop: 25 }}
                           >
                              Add Shifts
                           </Button>
                        </Link>
                     )}
                  </Grid>
               </Paper>
               <ConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
               />
            </Container>
         </CssBaseline>
      </div>
   );
};

export default ViewOccasion;
