import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { createRoster } from "../services/rosterServices"
import "@fontsource/roboto/400.css";
import { makeStyles } from "@material-ui/styles";
import { 
    Button,
    Select,
    InputLabel,
    MenuItem,
    TextField,
    Container,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    field: {
        marginTop: 30,
        marginBottom: 30,
        display: "flex",
    }
})

export default function CreateRoster() {

    const classes = useStyles();

    const initialFormData = {
        number_shifts: "",
        job_category: "",
        select_employees: ""
    }

    const [formData, setFormData] = useState(initialFormData);
    const { dispatch } = useGlobalState();
    let navigate = useNavigate();
    console.log(dispatch);

    function handleFormData(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        createRoster(formData).then((user) => {
            dispatch({ type: "setLoggedInUser", data: user.first_name });
            navigate("/");
        });
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Create New Roster</Typography>

            <form onSubmit={handleSubmit}>

                <InputLabel 
                id="role"
                className={classes.field}
                > 
                Role
                </InputLabel>

                <Select 
                    labelId ="job"
                    id="job"
                    label="Role"
                    name="job"
                    required
                    fullWidth
                    value={formData.job_category} 
                    onChange={handleFormData}
                >
                    <MenuItem value="WaitStaff">Wait Staff</MenuItem>
                    <MenuItem value="BarStaff">Bar Staff</MenuItem>
                    <MenuItem value="Chef">Chef</MenuItem>
                
                </Select>
                
                <InputLabel 
                id= "number_shifts"
                className={classes.field}
                >
                    Number of Shifts
                </InputLabel>
                <Select
                    labelId= "number_shifts"
                    id="number_shifts"
                    label="Number of Shifts"
                    name="number_shifts"
                    value={formData.number_shifts}
                    className={classes.field}
                    required
                    fullWidth
                    onChange={handleFormData}
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                </Select>
                <Button type="submit" color="primary">Submit</Button>
            </form>
        </Container>
    )
}
