import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { createOccasion } from "../services/occasionServices";
import "@fontsource/roboto/400.css";

const useStyles = makeStyles({
   field: {
      marginTop: 30,
      marginBottom: 30,
      display: "flex",
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
   const { dispatch } = useGlobalState();
   let navigate = useNavigate();
   console.log(dispatch);

   function handleFormData(event) {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   }

   function handleSubmit(event) {
      event.preventDefault();
      createOccasion(formData).then((user) => {
         dispatch({ type: "setLoggedInUser", data: user.first_name });
         navigate("/");
      });
   }
   return (
      <Container maxWidth="md">
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
            {/* <label htmlFor="email">Email</label> */}
            {/* <input type="text" name="email" id="email" value={formData.email} onChange={handleFormData}/> */}

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

            {/* <label htmlFor="password">Password</label> */}
            {/* <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/> */}

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

            {/* <label htmlFor="password_confirmation">Password Confirmation</label>
                <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/> */}

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

            {/* <label htmlFor="attendees">First Name</label>
                <input type="text" name="attendees" id="first_name" value={formData.first_name} onChange={handleFormData}/> */}

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

            {/* <label htmlFor="location">Last Name</label>
                <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleFormData}/> */}

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

            <Button type="submit" variant="contained" color="primary">
               Create Event
            </Button>
         </form>
      </Container>
   );
};

export default CreateOccasion;
