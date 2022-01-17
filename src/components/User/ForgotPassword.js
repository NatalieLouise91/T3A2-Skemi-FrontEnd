//import required dependencies and components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/passwordServices";

import { TextField, Typography, Container, Button, Paper } from "@mui/material";

export default function ForgotPassword() {
   //    Handling state management
   const initialFormData = {
      email: "",
   };

   // setting form data
   const [formData, setFormData] = useState(initialFormData);
   // const [errors, setErrors] = useState(null);

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
      forgotPassword(formData);
      navigate("/");
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
                     Password Reset Request
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
                     Submit
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