import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { createRoster } from "../services/rosterServices"
import "@fontsource/roboto/400.css";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Button,
    Select,
    InputLabel,
    MenuItem,
    Container,
    Typography
} from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    field: {
        margin: theme.spacing(1),
    }
}))

export default function CreateRoster() {

    const classes = useStyles();

    const [inputField, setInputField] = useState([
        { job_category: "", first_name: "", last_name: ""},
    ]);

    const { dispatch } = useGlobalState();
    let navigate = useNavigate();
    console.log(dispatch);

    // function handleFormData(event) {
    //     setInputField({
    //         ...inputField,
    //         [event.target.name]: event.target.value,
    //     });
    // }

    const handleChangeInput = (index, event) => {
        const values = [...inputField];
        values[index][event.target.name] = event.target.value;
        setInputField(values);
    }

    function handleSubmit(event) {
        event.preventDefault();
        createRoster(inputField).then((user) => {
            dispatch({ type: "setLoggedInUser", data: user.first_name });
            navigate("/");
        });
    }

    const handleAddFields = () => {
        setInputField([...inputField, { job_category: "", first_name: "", last_name: "" }])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputField];
        values.splice(index, 1);
        setInputField(values);
    }


    return (
        <Container maxWidth="md">
            <Typography variant="h4">Add Team Members to Roster</Typography>

            <form className={classes.root} onSubmit={handleSubmit}>

                { inputField.map((inputField, index) => (
                    <div key={index}>
                        <InputLabel 
                            id="role"
                            className={classes.field}
                            > 
                            Role
                        </InputLabel>

                        <Select 
                            labelId ="job_category"
                            id="job_category"
                            label="Role"
                            name="job_category"
                            className={classes.field}
                            required
                            fullWidth
                            value={inputField.job_category} 
                            onChange={event => handleChangeInput(index, event)}
                        >

                            <MenuItem value="waiter">Waiter</MenuItem>
                            <MenuItem value="bartender">Bartender</MenuItem>
                            <MenuItem value="chef">Chef</MenuItem>
                        {/* { role_list.map((role_list, index) => (
                            <MenuItem value={index}>{role_list[1]["role"]}</MenuItem>
                        ))} */}

                        
                        </Select>
                        
                        <InputLabel 
                        id= "first_name"
                        className={classes.field}
                        >
                            First Name
                        </InputLabel>
                        <Select
                            labelId= "first_name"
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            value={inputField.first_name}
                            className={classes.field}
                            required
                            fullWidth
                            onChange={event => handleChangeInput(index, event)}
                        >
                            <MenuItem value="Natalie">Natalie</MenuItem>
                            <MenuItem value="Jordan">Jordan</MenuItem>
                            <MenuItem value="Johnny">Johnny</MenuItem>
                            <MenuItem value="Sam">Sam</MenuItem>
                            <MenuItem value="Anna">Anna</MenuItem>
                            <MenuItem value="Stephanie">Stephanie</MenuItem>
                        </Select>
                        <InputLabel 
                        id= "first_name"
                        className={classes.field}
                        >
                            Last Name
                        </InputLabel>
                        <Select
                            labelId= "last_name"
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            value={inputField.last_name}
                            className={classes.field}
                            required
                            fullWidth
                            onChange={event => handleChangeInput(index, event)}
                        >
                            <MenuItem value="Natalie">Natalie</MenuItem>
                            <MenuItem value="Jordan">Jordan</MenuItem>
                            <MenuItem value="Johnny">Johnny</MenuItem>
                            <MenuItem value="Sam">Sam</MenuItem>
                            <MenuItem value="Anna">Anna</MenuItem>
                            <MenuItem value="Stephanie">Stephanie</MenuItem>
                        </Select>
                    
                        <IconButton
                            onClick={() => handleRemoveFields(index)}
                        >
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                        <IconButton
                            onClick={()=> handleAddFields()}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                </div>
                ))}

                <Button 
                    variant= "contained" 
                    type="submit" 
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </Container>
    )
}


let team_members = [
    {id:1, first_name: "Jane", last_name: "Doe"},
    {id:2, first_name: "John", last_name: "Smith"},
    {id:3, first_name: "Jack", last_name: "Sparrow"},
    {id:4, first_name: "Harry", last_name: "Potter"}
]

let role_list = [
    {id:1, role: "waiter"},
    {id:2, role: "bartender"},
    {id:3, role: "chef"}
]


