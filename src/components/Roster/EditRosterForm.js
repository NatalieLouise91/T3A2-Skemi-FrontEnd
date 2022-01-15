//import required dependencies and components
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/stateContext";
import {
   updateRoster,
   getRosterById,
} from "/Users/jordanhardy/Documents/coder/skemi/T3A2-Skemi-FrontEnd/src/services/rosterServices.js";
import "@fontsource/roboto/400.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Select, InputLabel, MenuItem, Paper } from "@material-ui/core";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// setting mui theme for component
const useStyles = makeStyles((theme) => ({
   root: {
      "& .MuiTextField-root": {
         margin: theme.spacing(1),
      },
   },
   button: {
      margin: theme.spacing(1),
   },
   field: {
      margin: theme.spacing(1),
   },
   alert: {
      color: "#DC143C",
   },
}));

// component function
export default function EditRosterForm() {
   const classes = useStyles();
   // sets classes for mui theme and variable for initial state data
   const initialFormData = {
      event_id: "",
      start_time: "",
      end_time: "",
      name: "",
      user_id: "",
      role: "",
   };

   // setting state with initial data
   const [formData, setFormData] = useState(initialFormData);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   //destructuring dispatch and store called from global state
   const { dispatch, store } = useGlobalState();

   // destructures occasion, loggedinuser and users objects from global state
   const { occasions } = store;
   const { users } = store;
   const { loggedInUser } = store;

   //sets useNavigate hook to a variable
   let navigate = useNavigate();
   let { id } = useParams();

   //side effect to get rosters by id from the database with an
   // api call function and setting form data state
   useEffect(() => {
      if (id) {
         getRosterById(id).then((roster) => {
            setFormData({
               event_id: roster.event_id,
               start_time: roster.start_time,
               end_time: roster.end_time,
               name: roster.name,
               user_id: roster.user_id,
               role: roster.role,
            });
         });
      }
   }, [id]);

   console.log(id);

   const times = [
      "0:00",
      "1:00",
      "2:00",
      "3:00",
      "4:00",
      "5:00",
      "6:00",
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
   ];

   // function to handle the change of input when user fills out form

   function handleFormData(event) {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   }

   // function to handle submit when user clicks on submit button

   function handleSubmit(e) {
      e.preventDefault();
      setFormErrors(validate(formData));
      setIsSubmit(true);
   }

   //side effect to assign keys, call updateroster function to post updated
   // form data to the database and then navigate to roster show route
   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         if (id) {
            updateRoster({ id: id, ...formData })
               .then((roster) => {
                  dispatch({
                     type: "updateRoster",
                     data: { id: id, ...formData },
                  });
                  navigate(`/rosters/${id}`);
               })
               .catch((error) => console.log(error));
         }
      }
   }, [formErrors, dispatch, formData, id, isSubmit, navigate]);

   //handles form field validation and error handling
   const validate = (values) => {
      const errors = {};
      if (!values.event_id) {
         errors.event_id = "An event name is required!";
      }
      if (!values.start_time) {
         errors.start_time = "A start time is required!";
      }
      if (!values.end_time) {
         errors.end_time = "An end time is required!";
      }
      if (!values.role) {
         errors.role = "A job role is required!";
      }
      if (!values.name) {
         errors.name = "A team member is required!";
      }
      if (!values.user_id) {
         errors.user_id = "Please confirm the team member!";
      }
      if (!values.author) {
         errors.author = "Please select your email for authorship";
      }
      return errors;
   };

   // returns MUI structured form to handles updates to the roster
   return (
      <form onSubmit={handleSubmit}>
         <Paper elevation={5} style={{ padding: 24, marginTop: 24 }}>
            <InputLabel id="event_id" className={classes.field}>
               Select Occasion
            </InputLabel>
            <Select
               labelId="event_id"
               id="event_id"
               name="event_id"
               className={classes.field}
               required
               fullWidth
               value={formData.event_id}
               onChange={handleFormData}
            >
               {/* maps over the occasions and assigns the occasion id as the key value
               renders the occasion name and down in a dropdown field */}
               {occasions.map((occasion) => (
                  <MenuItem key={occasion.id} value={occasion.id}>
                     {occasion.name}, {occasion.date}
                  </MenuItem>
               ))}
            </Select>
            {/* form errors handle form field data validataions */}
            {formErrors.event_id && (
               <p className={classes.alert}>
                  <ErrorOutlineIcon fontSize="small" /> {formErrors.event_id}
               </p>
            )}

            <InputLabel id="start_time" className={classes.field}>
               Start Time
            </InputLabel>

            <Select
               labelId="start_time"
               id="start_time"
               label="start_time"
               name="start_time"
               className={classes.field}
               required
               fullWidth
               value={formData.start_time}
               onChange={handleFormData}
            >
               {/* maps over times variable and returns each time as an element to select 
               in a dropdown field */}
               {times.map((element, index) => (
                  <MenuItem key={index} value={element}>
                     {element}
                  </MenuItem>
               ))}
            </Select>

            {formErrors.start_time && (
               <p className={classes.alert}>
                  <ErrorOutlineIcon fontSize="small" /> {formErrors.start_time}
               </p>
            )}

            <InputLabel id="end_time" className={classes.field}>
               End Time
            </InputLabel>

            <Select
               labelId="end_time"
               id="end_time"
               label="end_time"
               name="end_time"
               className={classes.field}
               required
               fullWidth
               value={formData.end_time}
               onChange={handleFormData}
            >
               {times.map((element, index) => (
                  <MenuItem key={index} value={element}>
                     {element}
                  </MenuItem>
               ))}
            </Select>

            {formErrors.end_time && (
               <p className={classes.alert}>
                  <ErrorOutlineIcon fontSize="small" /> {formErrors.end_time}
               </p>
            )}

            <InputLabel id="role" className={classes.field}>
               Role
            </InputLabel>

            <Select
               labelId="role"
               id="role"
               label="Role"
               name="role"
               className={classes.field}
               required
               fullWidth
               value={formData.role}
               onChange={handleFormData}
            >
               <MenuItem value="Waiter">Waiter</MenuItem>
               <MenuItem value="Bartender">Bartender</MenuItem>
               <MenuItem value="Chef">Chef</MenuItem>
            </Select>

            {formErrors.role && (
               <p className={classes.alert}>
                  <ErrorOutlineIcon fontSize="small" /> {formErrors.role}
               </p>
            )}

            <InputLabel id="name" className={classes.field}>
               Name
            </InputLabel>
            <Select
               labelId="name"
               id="name"
               label="Name"
               name="name"
               value={formData.name}
               className={classes.field}
               required
               fullWidth
               onChange={handleFormData}
            >
               {users.map((user, index) => (
                  <MenuItem
                     key={index}
                     value={user.first_name + " " + user.last_name}
                  >
                     {user.first_name}, {user.last_name}
                  </MenuItem>
               ))}
            </Select>

            {formErrors.name && (
               <p className={classes.alert}>
                  <ErrorOutlineIcon fontSize="small" /> {formErrors.name}
               </p>
            )}

            <InputLabel id="user_id" className={classes.field}>
               Confirm Team Member
            </InputLabel>
            <Select
               labelId="user_id"
               id="user_id"
               label="Confirm Team Member"
               name="user_id"
               value={formData.user_id}
               className={classes.field}
               required
               fullWidth
               onChange={handleFormData}
            >
               {/* maps over users and returns the first and last in a drop down field */}
               {users.map((user, index) => (
                  <MenuItem key={index} value={user.id}>
                     {user.first_name}, {user.last_name}
                  </MenuItem>
               ))}
            </Select>

            {formErrors.user_id && (
               <p className={classes.alert}>
                  <ErrorOutlineIcon fontSize="small" /> {formErrors.user_id}
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
               value={formData.author}
               className={classes.field}
               required
               fullWidth
               onChange={handleFormData}
            >
               <MenuItem value={loggedInUser}>{loggedInUser}</MenuItem>
            </Select>

            {formErrors.author && (
               <p className={classes.alert}>
                  <ErrorOutlineIcon fontSize="small" /> {formErrors.author}
               </p>
            )}

            <Button
               variant="contained"
               type="submit"
               color="primary"
               className={classes.button}
               onClick={handleSubmit}
            >
               Edit Shift
            </Button>
         </Paper>
      </form>
   );
}
