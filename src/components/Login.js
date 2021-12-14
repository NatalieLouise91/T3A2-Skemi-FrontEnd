import React, { useState } from 'react';
import { signIn } from '../services/authServices';
import { useGlobalState } from '../utils/stateContext';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const initialFormData = {
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialFormData)
    const { dispatch } = useGlobalState();
    let navigate = useNavigate();
    function handleFormData(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        signIn(formData)
        .then(({email, jwt}) => {
            dispatch({type: 'setLoggedInUser', data: email})
            dispatch({type: 'setToken', data: jwt})
            navigate('/')
        })
        .catch((error) => console.log(error))   
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData} />
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

