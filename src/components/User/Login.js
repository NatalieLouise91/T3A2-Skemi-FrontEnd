//import required dependencies and components
import React, { useState } from "react";
import { signIn } from "../../services/authServices.js";
import { useGlobalState } from "../../utils/stateContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
   TextField,
   Typography,
   Link,
   Grid,
   Container,
   Button,
   Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@material-ui/core";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// sets mui theme for component
const useStyles = makeStyles({
   root: {
      color: "#DC143C",
   },
});

//function renders a login form on the login page route
export default function Login() {
   const classes = useStyles();

   //    Handling state management
   const initialFormData = {
      email: "",
      password: "",
   };

   // setting form data
   const [formData, setFormData] = useState(initialFormData);
   const [errors, setErrors] = useState(null);

   // dispatching information to Global State
   const { dispatch } = useGlobalState();

   let navigate = useNavigate();

   //    function to handle user input
   function handleFormData(event) {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   }

   // function to handle the submit event of the form and catch any errors from user input

   function handleSubmit(event) {
      event.preventDefault();
      signIn(formData)
         .then(({ email, jwt }) => {
            sessionStorage.setItem("token", jwt);
            sessionStorage.setItem("user", email);
            dispatch({ type: "login", data: { email, jwt } });
            navigate("/");
         })
         .catch((error) => setErrors("Invalid email or password"));
   }


   //returns form fields and handles form state changes
   return (
      <Grid
         container
         height="100vh"
         alignItems="center"
         justifyContent="center"
      >
         <form onSubmit={handleSubmit}>
            <Container maxWidth="xs">
               <Paper style={{ padding: "16px 32px " }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                     <SendIcon fontSize="large" />
                  </div>
                  <Typography
                     textAlign="center"
                     variant="h5"
                     style={{ marginBottom: 24 }}
                  >
                     Sign in your account
                  </Typography>

                  <TextField
                     label="email"
                     name="email"
                     type="email"
                     id="email"
                     value={formData.email}
                     onChange={handleFormData}
                     fullWidth
                     margin="normal"
                     required
                  />

                  <TextField
                     label="password"
                     name="password"
                     type="password"
                     id="password"
                     value={formData.password}
                     onChange={handleFormData}
                     fullWidth
                     margin="normal"
                     required
                  />

                  <Button
                     variant="contained"
                     type="submit"
                     value="Login"
                     fullWidth
                     style={{
                        marginTop: "16px",
                        marginBottom: "8px",
                     }}
                  >
                     Login
                  </Button>
                  {errors && (
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" /> {errors}
                     </p>
                  )}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                     <Link
                        underline="none"
                        component={RouterLink}
                        to="/forgot_password"
                     >
                        Forgot Password
                     </Link>
                  </div>
                  <Typography
                     textAlign="center"
                     variant="caption"
                     component="p"
                     style={{ marginTop: 32, marginBottom: 4 }}
                  >
                     Or sign up new account
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                     <Link
                        underline="none"
                        component={RouterLink}
                        to="/new-user"
                     >
                        Create account
                     </Link>
                  </div>
               </Paper>
            </Container>
         </form>
      </Grid>
   );
}
