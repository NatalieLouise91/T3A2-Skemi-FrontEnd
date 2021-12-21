import React, { useState } from "react";
import { signIn } from "../services/authServices";
import { useGlobalState } from "../utils/stateContext";
import { useNavigate, Link } from "react-router-dom";
import {
   Button,
   TextField,
   Container,
   Paper,
   Divider,
} from "@material-ui/core";

export default function Login() {
   const initialFormData = {
      email: "",
      password: "",
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
      signIn(formData)
         .then(({ email, jwt }) => {
            sessionStorage.setItem("token", jwt);
            sessionStorage.setItem("user", email);
            dispatch({ type: "setLoggedInUser", data: email });
            dispatch({ type: "setToken", data: jwt });
            navigate("/");
         })
         .catch((error) => console.log(error));
   }

   return (
      <Container maxWidth="xs">
         <Paper elevation={5} style={{ padding: 25, marginTop: 50 }}>
            {/* <Typography variant="h4" style={{ padding: 10 }}>
               Login
            </Typography> */}
            <form onSubmit={handleSubmit}>
               <TextField
                  style={{ marginTop: 20 }}
                  InputLabelProps={{ shrink: true }}
                  type="email"
                  name="email"
                  id="outlined-basic"
                  value={formData.email}
                  onChange={handleFormData}
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <TextField
                  style={{ marginTop: 20 }}
                  InputLabelProps={{ shrink: true }}
                  type="password"
                  name="password"
                  id="outlined-basic"
                  value={formData.password}
                  onChange={handleFormData}
                  label="Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
               />
               <Button
                  style={{ marginTop: 20 }}
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  fullWidth
                  required
               >
                  Login
               </Button>
            </form>
            <Divider style={{ marginTop: 20 }} />
            <Link to="/new-user" style={{ textDecoration: "none" }}>
               <Button
                  style={{ marginTop: 20 }}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  required
               >
                  Sign Up
               </Button>
            </Link>
         </Paper>
      </Container>
   );
}
