import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authServices';
import { useGlobalState } from '../utils/stateContext'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
        // job: ""
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
                    {/* <label htmlFor="email">Email</label> */}
                    {/* <input type="text" name="email" id="email" value={formData.email} onChange={handleFormData}/> */}

                    <TextField type="password" name="password" id="password" value={formData.password} onChange={handleFormData}
                        className={classes.field} 
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    {/* <label htmlFor="password">Password</label> */}
                    {/* <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/> */}

                    <TextField type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}
                        className={classes.field} 
                        label="Password Confirmation"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    {/* <label htmlFor="password_confirmation">Password Confirmation</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/> */}

                    <TextField type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleFormData}
                        className={classes.field} 
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    {/* <label htmlFor="first_name">First Name</label>
                    <input type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleFormData}/> */}

                    <TextField type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleFormData}
                        className={classes.field} 
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    {/* <label htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleFormData}/> */}

                    <TextField type="text" name="phone" id="phone" value={formData.phone} onChange={handleFormData}
                        className={classes.field} 
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                        />

                    {/* <label htmlFor="phone">Phone Number</label>
                    <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleFormData}/> */}
                    

                    <InputLabel id="role">Role</InputLabel>
                    <Select 
                        labelId ="job"
                        id="job"
                        label="Role"
                        name="job"
                        value={formData.job} 
                        onChange={handleFormData}
                        >
                        <MenuItem value="WaitStaff">Wait Staff</MenuItem>
                        <MenuItem value="BarStaff">Bar Staff</MenuItem>
                        <MenuItem value="Chef">Chef</MenuItem>
                    
                    </Select>

                    {/* <label htmlFor="job">Job Department</label> */}

                    {/* <select name="job" id="job" value={formData.job} onChange={handleFormData}>
                        <option value = "bar">Bar Staff</option>
                        <option value = "bar">Wait Staff</option>
                        <option value = "bar">Chef</option>
                    </select> */}

                    <Button onClick={handleSubmit} type="submit" color="primary">Register</Button>

                </form>
            </Paper>
        </Container>
    </Grid>
    )
}

