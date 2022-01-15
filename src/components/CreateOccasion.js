import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import ConfirmDialog from "./ConfirmDialog";
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
const useStyles = makeStyles({
   field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
   },
   root: {
      color: '#DC143C'
   }
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
      author: "",
   };

   const [formData, setFormData] = useState(initialFormData);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
   });

   const { dispatch, store } = useGlobalState();
   let navigate = useNavigate();
   let { id } = useParams();
   const { occasions } = store;
   const { loggedInUser } = store;

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

   function handleSubmit() {
     setFormErrors(validate(formData));
     setIsSubmit(true)
   }

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         if (id) {
            updateOccasion({ id: id, ...formData }).then((occasion) => {
               dispatch({ type: "updateOccasion", data: { id: id, ...formData } });
               setConfirmDialog({
                  ...confirmDialog,
                  isOpen: false,
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
         .catch((error) => console.log(error))
      }
   }
  },[formErrors])

  const validate = (values) => {
      const errors = {}
      if(!values.name) {
          errors.name = "A name is required!";
      } else if (values.name.length < 4){
          errors.name = "The event name must be more than four characters";
      }
      if(!values.description) {
          errors.description = "A description is required!";
      } else if (values.description.length < 20) {
          errors.description = "Please type in a sentence to provide details of the event";
      } 
      if(!values.date) {
          errors.date = "A date is required!";
      } 
      if(!values.attendees) {
          errors.attendees = "A number of attendees is required!";
      } else if (isNaN(values.attendees)) {
         errors.attendees = "Please enter in a numerical value"
      }
      if(!values.location) {
          errors.location = "A location is required!";
      }
      if(!values.time) {
          errors.time = "A time is required!";
      }
      if(!values.contact_name) {
         errors.contact_name = "A primary contact name is required!";
      } else if (values.contact_name.length < 4) {
         errors.contact_name = "Please type in the full name of the primary contact";
      }
      if (!values.contact_phone) {
         errors.contact_phone = "A primary contact phone number is required!";
      } else if (values.contact_phone.length !== 10) {
          errors.contact_phone = "Primary contact phone number must be 10 digits long";
      }
      if (!values.author) {
         errors.author = "Please select your email";
      }
      return errors;
  }

   return (
      <Container maxWidth="sm">
         <Paper elevation={5} style={{ padding: 24, marginTop: 24 }}>
            {id ?
            <Typography variant="h4"> Edit Event</Typography>
            :
            <Typography variant="h4"> Create New Event</Typography>
            }
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
               {formErrors.name &&
               <p className={classes.root}>{formErrors.name}</p>
               }
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
               {formErrors.description &&
               <p className={classes.root}>{formErrors.description}</p>
               }
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
               {formErrors.date &&
               <p className={classes.root}>{formErrors.date}</p>
               }
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
               {formErrors.attendees &&
               <p className={classes.root}>{formErrors.attendees}</p>
               }
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
               {formErrors.location &&
               <p className={classes.root}>{formErrors.location}</p>
               }
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
               {formErrors.time &&
               <p className={classes.root}>{formErrors.time}</p>
               }
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
               {formErrors.contact_name &&
               <p className={classes.root}>{formErrors.contact_name}</p>
               }
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
               {formErrors.contact_phone &&
               <p className={classes.root}>{formErrors.contact_phone}</p>
               }
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

               {formErrors.author &&
               <p className={classes.root}>{formErrors.author}</p>
               }

               {id? 
               
               <Button
                  onClick={() => {
                     setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure you want to update this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                           handleSubmit();
                        },
                     });
                  }}
                  variant="contained"
                  color="primary"
               >
                  Edit Event
               </Button>

               :
               <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
               >
                  Create Event
               </Button>
               }

            </form>
         </Paper>
         <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
         />
      </Container>
   );
};

export default CreateOccasion;