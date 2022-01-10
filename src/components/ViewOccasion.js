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
import { getOccasionById, deleteOccasion } from "../services/occasionServices";
import RostersByOccasion from "./RostersByOccasion";
import ConfirmDialog from "./ConfirmDialog";
// import { useGlobalState } from "../utils/stateContext";

const ViewOccasion = () => {
   // const { dispatch } = useGlobalState();
   const [occasion, setOccasion] = useState();
   const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
   });
   // const [edit, setEdit] = useState(false);
   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      getOccasionById(id)
         .then((occasion) => setOccasion(occasion))
         .catch((error) => console.log(error));
   }, [id]);

   if (!occasion) return null;
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

   // const editOccasion = () => {
   //    setEdit((prevEdit) => !prevEdit);
   // };

   // const cancelEdit = () => {
   //    setEdit(false);
   // };

   return (
      <div>
         {/* <div>{edit ? <EditOccasion cancelEdit={cancelEdit} /> : null}</div> */}
         <CssBaseline>
            <Container>
               <Container
                  align="center"
                  // style={{ padding: 24, marginTop: 25 }}
               >
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
                     <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                           <Button
                              size="small"
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={() => navigate(`/events/update/${id}`)}
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
                                 setConfirmDialog({
                                    isOpen: true,
                                    title: "Are you sure to delete this record?",
                                    subTitle: "You can't undo this operation",
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
