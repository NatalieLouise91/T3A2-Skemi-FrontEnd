import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import {
   Button,
   TextField,
   Container,
   Typography,
   Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
   createOccasion,
   getOccasionById,
   updateOccasion,
} from "../services/occasionServices";
import "@fontsource/roboto/400.css";
const useStyles = makeStyles({
   field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
   },
});

const CreateOccasion = () => {
   const classes = useStyles();
   const initialFormData = {
      name: "",
      description: "",
      date: "",
      attendees: "",
      location: "",
      time: "",
      contact_name: "",
      contact_phone: "",
   };
   const [formData, setFormData] = useState(initialFormData);
   const { dispatch, store } = useGlobalState();
   let navigate = useNavigate();
   let { id } = useParams();
   const { occasions } = store;

   useEffect(() => {
      if (id) {
         getOccasionById(id).then((occasion) => {
            setFormData({
               name: occasion.name,
               description: occasion.description,
               date: occasion.date,
               attendees: occasion.attendees,
               location: occasion.location,
               time: occasion.time,
               contact_name: occasion.contact_name,
               contact_phone: occasion.contact_phone,
            });
         });
      }
   }, [id]);

   function getLastId() {
      console.log(occasions);
      const ids = occasions.map((occasion) => occasion.id);
      console.log(ids);
      return Math.max(...ids);
   }

   function handleFormData(event) {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   }

   function handleSubmit(event) {
      event.preventDefault();
      console.log(id)
      if (id) {
         updateOccasion({ id: id, ...formData }).then((occasion) => {
            dispatch({ type: "updateOccasion", data: { id: id, ...formData } });
            navigate(`/events/${id}`);
         });
      } else {
         const nextId = getLastId() + 1;
         createOccasion({ ...formData, id: nextId })
            .then((occasion) => {
               dispatch({ type: "addOccasion", data: occasion });
               navigate("/");
            })
            .catch((error) => console.log(error));
      }
   }

   // function handleSubmit(event) {
   //    event.preventDefault();
   //    createOccasion(formData).then((occasion) => {
   //       dispatch({
   //          type: "addOccasion",
   //          data: occasion,
   //       });
   //       navigate("/");
   //    });
   // }

   return (
      <Container maxWidth="sm">
         <Paper elevation={5} style={{ padding: 24, marginTop: 24 }}>
            <Typography variant="h4"> Create New Event</Typography>
            <form onSubmit={handleSubmit}>
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="name"
                  id="outlined-basic"
                  value={formData.name}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Event Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Event Description"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Date"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="attendees"
                  id="attendees"
                  value={formData.attendees}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Number of Attendees"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Location"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Time"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="contact_name"
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Primary Contact Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="contact_phone"
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleFormData}
                  className={classes.field}
                  label="Primary Contact Phone"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
               >
                  {id ? "Edit Event" : "Create Event"}
               </Button>
               {/* <Button type="submit" variant="contained" color="primary">
                  Create Event
               </Button> */}
            </form>
         </Paper>
      </Container>
   );
};

export default CreateOccasion;
