import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/authServices';
import {useGlobalState} from '../utils/stateContext'

export default function NewUser() {

    const initialFormData = {
        email: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
        phone: "",
        job: ""
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
        .then((user) => {
            dispatch({type: 'setLoggedInUser', data: user.first_name})
            navigate('/home')
        })

    }
    return (
        <div>
            <h1>Create a User</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={formData.email} onChange={handleFormData}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>

                <label htmlFor="password_confirmation">Password Confirmation</label>
                <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/>

                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleFormData}/>

                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleFormData}/>

                <label htmlFor="phone">Phone Number</label>
                <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleFormData}/>

                <label htmlFor="job">Job Department</label>
                <input type="text" name="job" id="job" value={formData.job} onChange={handleFormData}/>

                <input type="submit" value="login" />
                
            </form>
            
        </div>
    )
}
