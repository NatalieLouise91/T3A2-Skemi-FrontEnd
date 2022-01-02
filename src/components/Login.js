import React, { useState } from 'react';
import { signIn } from '../services/authServices';
import { useGlobalState } from '../utils/stateContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {TextField, Typography, Link, Grid, Container, Button, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'


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

    return(
   
    <Grid 
        container
        height = '100vh'
        alignItems = 'center'
        justifyContent = 'center'
    >
        <form onSubmit={handleSubmit}>
            <Container maxWidth='xs'>
                <Paper style={{ padding: "16px 32px "}}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SendIcon fontSize='large' />
                    </div>
                    <Typography textAlign='center' variant='h5' style={{marginBottom: 24}}>
                        Sign in your account
                    </Typography>
                        {/* <label htmlFor="email">Email:</label> */}
                    <TextField 
                        label='email'
                        name='email'
                        type='email'
                        id='email'
                        value={formData.email}
                        onChange={handleFormData} 
                        fullWidth
                        margin='normal' 
                    />
                        {/* <input type="email" name="email" id="email" value={formData.email} onChange={handleFormData}/> */}
                        {/* <label htmlFor="password">Password:</label> */}
                    <TextField 
                        label='password'
                        name='password'
                        type='password'
                        id='password'
                        value={formData.password}
                        onChange={handleFormData}
                        fullWidth
                        margin='normal' 
                    />
                        {/* <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData} /> */}
                    <Button
                        variant='contained'
                        type='submit'
                        value='Login'
                        fullWidth
                        style={{ 
                            marginTop: '16px',
                            marginBottom: '8px'
                        }}>
                        Login
                    </Button>
                    <Typography textAlign='center' variant='caption' component='p' style={{ marginTop: 32, marginBottom: 4}}>
                        Or sign up new account
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Link underline='none' component={RouterLink} to='/new-user'>
                            Create account
                        </Link>
                    </div>
                        {/* <input type="submit" value="Login"/> */}
                </Paper>
            </Container>
        </form>
    </Grid>
    )
}

