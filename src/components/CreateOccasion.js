import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { createOccasion } from "../services/occasionServices";
// import { InputLabel } from "@material-ui/core";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";

// const useStyles = makeStyles({
//    field: {
//       marginTop: 20,
//       marginBottom: 20,
//       display: "block",
//    },
// });

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
      <div>
         <h1>User Registration</h1>

         <form onSubmit={handleSubmit}>
            <TextField
               type="text"
               name="email"
               id="name"
               value={formData.name}
               onChange={handleFormData}
               className={classes.field}
               label="Event Name"
               variant="outlined"
               fullWidth
               required
            />
            {/* <label htmlFor="email">Email</label> */}
            {/* <input type="text" name="email" id="email" value={formData.email} onChange={handleFormData}/> */}

            <TextField
               type="description"
               name="description"
               id="description"
               value={formData.description}
               onChange={handleFormData}
               className={classes.field}
               label="Event Description"
               variant="outlined"
               fullWidth
               required
            />

            {/* <label htmlFor="password">Password</label> */}
            {/* <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/> */}

            <TextField
               type="date"
               name="date"
               id="date"
               value={formData.date}
               onChange={handleFormData}
               className={classes.field}
               label="Date of Event"
               variant="outlined"
               fullWidth
               required
            />

            {/* <label htmlFor="password_confirmation">Password Confirmation</label>
                <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/> */}

            <TextField
               type="text"
               name="attendees"
               id="attendees"
               value={formData.attendees}
               onChange={handleFormData}
               className={classes.field}
               label="Number of Attendees"
               variant="outlined"
               fullWidth
               required
            />

            {/* <label htmlFor="attendees">First Name</label>
                <input type="text" name="attendees" id="first_name" value={formData.first_name} onChange={handleFormData}/> */}

            <TextField
               type="text"
               name="location"
               id="location"
               value={formData.location}
               onChange={handleFormData}
               className={classes.field}
               label="Location"
               variant="outlined"
               fullWidth
               required
            />

            {/* <label htmlFor="location">Last Name</label>
                <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleFormData}/> */}

            <TextField
               type="text"
               name="time"
               id="time"
               value={formData.time}
               onChange={handleFormData}
               className={classes.field}
               label="Time"
               variant="outlined"
               fullWidth
               required
            />

            <TextField
               type="text"
               name="contact_name"
               id="contact_name"
               value={formData.contact_name}
               onChange={handleFormData}
               className={classes.field}
               label="Primary Contact"
               variant="outlined"
               fullWidth
               required
            />

            <TextField
               type="text"
               name="contact_phone"
               id="contact_phone"
               value={formData.contact_phone}
               onChange={handleFormData}
               className={classes.field}
               label="Primary Contact Phone"
               variant="outlined"
               fullWidth
               required
            />

            <Button type="submit" color="primary">
               Create Event
            </Button>
         </form>
      </div>
   );
};

export default CreateOccasion;
