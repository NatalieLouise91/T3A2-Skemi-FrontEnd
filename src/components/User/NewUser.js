//import required dependencies and components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/authServices.js";
import { useGlobalState } from "../../utils/stateContext";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Grid } from "@mui/material";
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

// function to return and render a form for new users to register to the app
export default function NewUser() {
   const classes = useStyles();

   // sets classes for mui theme and variable for initial state data
   const initialFormData = {
      email: "",
      password: "",
      password_confirmation: "",
      first_name: "",
      last_name: "",
      phone: "",
   };

   // setting state with initial data
   const [formData, setFormData] = useState(initialFormData);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   //destructuring dispatch functions called from global state
   const { dispatch } = useGlobalState();
   let navigate = useNavigate();

   // handles event actions on form fields
   function handleFormData(event) {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   }

   // handles form submission and sets state
   function handleSubmit(event) {
      event.preventDefault();
      setFormErrors(validate(formData));
      setIsSubmit(true);
   }

   //side effect to set object keys required by react and adds a user auth token
   // on the user record on the database as well as an email and calls
   // setloggeduser function 
   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         signUp(formData).then((data) => {
            sessionStorage.setItem("token", data.jwt);
            sessionStorage.setItem("user", data.email);
            dispatch({ type: "setLoggedInUser", data: data.first_name });
            navigate("/");
            window.location.reload();
         });
      }
   }, [formErrors, dispatch, formData, isSubmit, navigate]);


   //function to validate form data and return validation errors
   const validate = (values) => {
      const errors = {};
      const regrex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.email) {
         errors.email = "An email address is required!";
      } else if (!regrex.test(values.email)) {
         errors.email = "This is not a valid email address";
      }
      if (!values.password) {
         errors.password = "A valid password is required!";
      } else if (values.password.length < 6) {
         errors.password = "A password must contain at least 6 characters";
      } else if (values.password.length > 10) {
         errors.password = "A password not be more than 10 characters";
      }
      if (!values.password_confirmation) {
         errors.password_confirmation = "Please enter in your password again";
      } else if (values.password_confirmation !== values.password) {
         errors.password_confirmation =
            "Your password confirmation doesn't match your password";
      }
      if (!values.first_name) {
         errors.first_name = "A first name is required";
      }
      if (!values.last_name) {
         errors.last_name = "A last name is required";
      }
      if (!values.phone) {
         errors.phone = "A phone number is required";
      } else if (values.phone.length !== 10) {
         errors.phone = "Your phone number must be 10 digits long";
      }
      return errors;
   };


   //returns mui component based form for new user registration
   return (
      <Grid container height="80vh" alignItems="center" justifyContent="center">
         <Container maxWidth="sm">
            <Paper style={{ padding: 24, marginTop: 24 }}>
               <h1>User Registration</h1>

               <form onSubmit={handleSubmit}>
                  <TextField
                     type="text"
                     name="email"
                     id="email"
                     value={formData.email}
                     onChange={handleFormData}
                     className={classes.field}
                     label="Email"
                     variant="outlined"
                     fullWidth
                     required
                  />

                  {formErrors.email &&
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" /> {formErrors.email}
                     </p>
                  }

                  <TextField
                     type="password"
                     name="password"
                     id="password"
                     value={formData.password}
                     onChange={handleFormData}
                     className={classes.field}
                     label="Password"
                     variant="outlined"
                     fullWidth
                     required
                  />
                  {formErrors.password &&
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" /> {formErrors.password}
                     </p>
                  }

                  <TextField
                     type="password"
                     name="password_confirmation"
                     id="password_confirmation"
                     value={formData.password_confirmation}
                     onChange={handleFormData}
                     className={classes.field}
                     label="Password Confirmation"
                     variant="outlined"
                     fullWidth
                     required
                  />

                  {formErrors.password_confirmation && 
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" />{" "}
                        {formErrors.password_confirmation}
                     </p>
                  }

                  <TextField
                     type="text"
                     name="first_name"
                     id="first_name"
                     value={formData.first_name}
                     onChange={handleFormData}
                     className={classes.field}
                     label="First Name"
                     variant="outlined"
                     fullWidth
                     required
                  />

                  {formErrors.first_name &&
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" />{" "}
                        {formErrors.first_name}
                     </p>
                  }

                  <TextField
                     type="text"
                     name="last_name"
                     id="last_name"
                     value={formData.last_name}
                     onChange={handleFormData}
                     className={classes.field}
                     label="Last Name"
                     variant="outlined"
                     fullWidth
                     required
                  />

                  {formErrors.last_name &&
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" />{" "}
                        {formErrors.last_name}
                     </p>
                  }

                  <TextField
                     type="text"
                     name="phone"
                     id="phone"
                     value={formData.phone}
                     onChange={handleFormData}
                     className={classes.field}
                     label="Phone"
                     variant="outlined"
                     fullWidth
                     required
                  />

                  {formErrors.phone && 
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" /> {formErrors.phone}
                     </p>
                  }

                  <Button onClick={handleSubmit} type="submit" color="primary">
                     Register
                  </Button>
               </form>
            </Paper>
         </Container>
      </Grid>
   );
}
