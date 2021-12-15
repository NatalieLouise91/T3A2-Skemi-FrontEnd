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
// import { useGlobalState } from "../utils/stateContext";
import EditOccasion from "./EditOccasion";

const ViewOccasion = () => {
   // const { dispatch } = useGlobalState();
   const [occasion, setOccasion] = useState();
   const [edit, setEdit] = useState(false);
   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      getOccasionById(id)
         .then((occasion) => setOccasion(occasion))
         .catch((error) => console.log(error));
   }, [id]);

   const removeOccasion = () => {
      deleteOccasion(id)
         .then(navigate("/"))
         .catch((error) => console.log(error));
   };

   const editOccasion = () => {
      setEdit((prevEdit) => !prevEdit);
   };

   const cancelEdit = () => {
      setEdit(false);
   };
   return (
      <div>
         <div>{edit ? <EditOccasion cancelEdit={cancelEdit} /> : null}</div>
         <CssBaseline>
            {occasion ? (
               <>
                  <Container>
                     <Container
                        align="center"
                        // style={{ padding: 24, marginTop: 25 }}
                     >
                        <Typography
                           variant="h5"
                           style={{ padding: 5, marginTop: 25 }}
                        >
                           {occasion.name}
                        </Typography>
                     </Container>
                     <Paper
                        elevation={5}
                        style={{ padding: 24, marginTop: 25 }}
                     >
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
                                 <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={editOccasion}
                                 >
                                    Edit Event
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
                        </Container>
                     </Paper>
                  </Container>
               </>
            ) : (
               <>
                  <p>Invalid Event ID</p>
               </>
            )}
         </CssBaseline>
      </div>
   );
};

export default ViewOccasion;
