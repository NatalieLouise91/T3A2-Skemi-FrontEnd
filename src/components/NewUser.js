import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authServices';
import { useGlobalState } from '../utils/stateContext'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Grid } from '@mui/material';


const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

export default function NewUser() {

    const classes = useStyles()

    const initialFormData = {
        email: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
        phone: "",
    }

    const [formData, setFormData] = useState(initialFormData)
    const {dispatch} = useGlobalState()
    let navigate = useNavigate()

    function handleFormData(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        signUp(formData)
        .then((data) => {
            sessionStorage.setItem('token', data.jwt)
            sessionStorage.setItem('user', data.email)
            dispatch({type: 'setLoggedInUser', data: data.first_name})
            navigate('/')
            window.location.reload();
        })

    }
    return (

    <Grid 
        container
        height = '80vh'
        alignItems = 'center'
        justifyContent = 'center'
    >
        <Container maxWidth='sm'>
            <Paper style={{ padding: 24, marginTop: 24 }}>
                <h1>User Registration</h1>

                <form onSubmit={handleSubmit}>

                    <TextField type="text" name="email" id="email" value={formData.email} onChange={handleFormData}
                        className={classes.field} 
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    <TextField type="password" name="password" id="password" value={formData.password} onChange={handleFormData}
                        className={classes.field} 
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    <TextField type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}
                        className={classes.field} 
                        label="Password Confirmation"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    <TextField type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleFormData}
                        className={classes.field} 
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    <TextField type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleFormData}
                        className={classes.field} 
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        />


                    <TextField type="text" name="phone" id="phone" value={formData.phone} onChange={handleFormData}
                        className={classes.field} 
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    <Button onClick={handleSubmit} type="submit" color="primary">Register</Button>

                </form>
            </Paper>
        </Container>
    </Grid>
    )
}

