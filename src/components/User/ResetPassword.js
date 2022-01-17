//import required dependencies and components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/passwordServices";

import { TextField, Typography, Container, Button, Paper } from "@mui/material";

export default function ForgotPassword() {
   //    Handling state management
   const initialFormData = {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
   };

   // setting form data
   const [formData, setFormData] = useState(initialFormData);

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

      if (formData.password !== formData.password_confirmation) {
         alert("Passwords don't match");
         setFormData({
            password: "",
            password_confirmation: "",
         });
      } else {
         resetPassword(formData);
      }
      navigate("/login");
   }

   //returns form fields and handles form state changes
   return (
      <>
         <form onSubmit={handleSubmit}>
            <Container maxWidth="xs">
               <Paper style={{ padding: "16px 32px " }}>
                  <Typography
                     textAlign="center"
                     variant="h5"
                     style={{ marginBottom: 24 }}
                  >
                     Reset Password
                  </Typography>
                  <TextField
                     InputLabelProps={{ shrink: true }}
                     label="token"
                     name="token"
                     type="text"
                     id="token"
                     value={formData.token}
                     onChange={handleFormData}
                     fullWidth
                     margin="normal"
                     required
                  />
                  <TextField
                     InputLabelProps={{ shrink: true }}
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
                     InputLabelProps={{ shrink: true }}
                     label="New Password:"
                     name="password"
                     type="text"
                     id="password"
                     value={formData.password}
                     onChange={handleFormData}
                     fullWidth
                     margin="normal"
                     required
                  />
                  <TextField
                     InputLabelProps={{ shrink: true }}
                     label="Confirm Password:"
                     name="password_confirmation"
                     type="text"
                     id="password_confirmation"
                     value={formData.password_confirmation}
                     onChange={handleFormData}
                     fullWidth
                     margin="normal"
                     required
                  />
                  <Button
                     variant="contained"
                     type="submit"
                     value="Submit"
                     fullWidth
                     style={{
                        marginTop: "16px",
                        marginBottom: "8px",
                     }}
                  >
                     Reset Password
                  </Button>
                  {/* {errors && (
                     <p className={classes.root}>
                        <ErrorOutlineIcon fontSize="small" /> {errors}
                     </p>
                  )} */}
               </Paper>
            </Container>
         </form>
      </>
   );
}
