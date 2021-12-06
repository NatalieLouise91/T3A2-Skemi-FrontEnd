import React, { useState } from 'react';

const Login = ({history, activateUser}) => {
    const initialFormData = {
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(event) {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        activateUser(formData.email)
        return history.push("/home")
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

export default Login