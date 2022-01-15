//import required dependencies and components
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import {
   Button,
   TextField,
   Container,
   Typography,
   Paper,
   Select,
   MenuItem,
   InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
   createOccasion,
   getOccasionById,
   updateOccasion,
} from "../services/occasionServices";
import "@fontsource/roboto/400.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// sets mui theme for component
const useStyles = makeStyles({
   field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
   },
   root: {
      color: "#DC143C",
   },
});


const CreateOccasion = () => {
   // sets classes for mui theme and variable for initial state data
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
      author: "",
   };

   // setting state with initial data
   const [formData, setFormData] = useState(initialFormData);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   //destructuring dispatch and store called from global state
   const { dispatch, store } = useGlobalState();
   
   // destructures occasions and loggedinuser objects from global state
   const { occasions } = store;
   const { loggedInUser } = store;
   
   //sets useNavigate hook to a variable
   let navigate = useNavigate();

   //accesses url params to access the id params
   let { id } = useParams();

   //side effect to get occasions by id from the database 
   // with an api call and setting form data state
   useEffect(() => {
      if (id) {
         getOccasionById(id).then((occasion) => {
            setFormData({
               name: occasion.event_name,
               description: occasion.description,
               date: occasion.date,
               attendees: occasion.attendees,
               location: occasion.location,
               time: occasion.time,
               contact_name: occasion.contact_name,
               contact_phone: occasion.contact_phone,
               author: occasion.author,
            });
         });
      }
   }, [id]);

   //returns the id for the last element in and array of occasion objects (occasionList)
   function getLastId() {
      const ids = occasions.map((occasion) => occasion.id);
      return Math.max(...ids);
   }

   // handles the form field inputs on events
   function handleFormData(event) {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   }

   //function to handle submitting the form
   function handleSubmit() {
      //setting state
      setFormErrors(validate(formData));
      setIsSubmit(true);
   }

   //side effect to create a new occasion through a new form or post an update call to the api/database with updated form
   //fields populated by returning fields on the occasion id of the occasion that was selected in the previous screen
   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         if (id) {
            updateOccasion({ id: id, ...formData }).then((occasion) => {
               dispatch({
                  type: "updateOccasion",
                  data: { id: id, ...formData },
               });
               navigate(`/events/${id}`);
               window.location.reload();
            });
         } else {
            const nextId = getLastId() + 1;
            createOccasion({ ...formData, id: nextId })
               .then((occasion) => {
                  dispatch({ type: "addOccasion", data: occasion });
                  navigate("/");
                  window.location.reload();
               })
               .catch((error) => console.log(error));
         }
      }
   }, [formErrors, dispatch, formData, id, isSubmit, navigate]);

   //checks and validates form fields and returns associated errors if incorrect
   const validate = (values) => {
      const errors = {};
      if (!values.name) {
         errors.name = "A name is required!";
      } else if (values.name.length < 4) {
         errors.name = "The event name must be more than four characters";
      }
      if (!values.description) {
         errors.description = "A description is required!";
      } else if (values.description.length < 20) {
         errors.description =
            "Please type in a sentence to provide details of the event";
      }
      if (!values.date) {
         errors.date = "A date is required!";
      }
      if (!values.attendees) {
         errors.attendees = "A number of attendees is required!";
      } else if (isNaN(values.attendees)) {
         errors.attendees = "Please enter in a numerical value";
      }
      if (!values.location) {
         errors.location = "A location is required!";
      }
      if (!values.time) {
         errors.time = "A time is required!";
      }
      if (!values.contact_name) {
         errors.contact_name = "A primary contact name is required!";
      } else if (values.contact_name.length < 4) {
         errors.contact_name =
            "Please type in the full name of the primary contact";
      }
      if (!values.contact_phone) {
         errors.contact_phone = "A primary contact phone number is required!";
      } else if (values.contact_phone.length !== 10) {
         errors.contact_phone =
            "Primary contact phone number must be 10 digits long";
      }
      if (!values.author) {
         errors.author = "Please select your email";
      }
      return errors;
   };

   // returning MUI based form referencing handleSubmit function and handleFormData from state
   return (
      <Container maxWidth="sm">
         <Paper elevation={5} style={{ padding: 24, marginTop: 24 }}>
            {id ? (
               <Typography variant="h4"> Edit Event</Typography>
            ) : (
               <Typography variant="h4"> Create New Event</Typography>
            )}
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
               {formErrors.name && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" /> {formErrors.name}
                  </p>
               )}
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
               {formErrors.description && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" />{" "}
                     {formErrors.description}
                  </p>
               )}
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
               {formErrors.date && (
                  <p className={classes.root}>{formErrors.date}</p>
               )}
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
               {formErrors.attendees && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" />{" "}
                     {formErrors.attendees}
                  </p>
               )}
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
               {formErrors.location && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" /> {formErrors.location}
                  </p>
               )}
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
               {formErrors.time && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" /> {formErrors.time}
                  </p>
               )}
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
               {formErrors.contact_name && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" />{" "}
                     {formErrors.contact_name}
                  </p>
               )}
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
               {formErrors.contact_phone && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" />{" "}
                     {formErrors.contact_phone}
                  </p>
               )}
               <InputLabel id="author" className={classes.field}>
                  Author
               </InputLabel>
               <Select
                  labelId="author"
                  id="author"
                  label="Author"
                  name="author"
                  className={classes.field}
                  required
                  fullWidth
                  value={formData.author}
                  onChange={handleFormData}
               >
                  <MenuItem value={loggedInUser}>{loggedInUser}</MenuItem>
               </Select>

               {formErrors.author && (
                  <p className={classes.root}>
                     <ErrorOutlineIcon fontSize="small" /> {formErrors.author}
                  </p>
               )}

               {id ? (
                  <Button
                     onClick={handleSubmit}
                     variant="contained"
                     color="primary"
                  >
                     Edit Event
                  </Button>
               ) : (
                  <Button
                     onClick={handleSubmit}
                     variant="contained"
                     color="primary"
                  >
                     Create Event
                  </Button>
               )}
            </form>
         </Paper>
      </Container>
   );
};

export default CreateOccasion;
