import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { createRoster, getRosterById, updateRoster } from "../services/rosterServices"
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

    const times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]

    const classes = useStyles();

    const [inputField, setInputField] = useState([
        { event_id: "", start_time: "", end_time: "", role: "", name: ""},
    ]);

    const { dispatch, store } = useGlobalState();

    let { id } = useParams();
    const { rosters } = store; 
    const { occasions } = store;
    const { users } = store;

// useEffect hook to return prefilled form data if there is an existing roster with that id.

    useEffect(() => {
        if (id) {
           getRosterById(id).then((roster) => {
              setInputField({
                event_id: roster.event_id,
                start_time: roster.start_time,
                end_time: roster.end_time,
                role: roster.role,
                name: roster.name,  
              });
           });
        }
     }, [id]);

// function to return the last id in the roster database

    function getLastId() {
        const ids = rosters.map((roster) => roster.id);
        return Math.max(...ids);
    }

    console.log()

    let navigate = useNavigate();
    

    const handleChangeInput = (index, event) => {
        const values = [...inputField];
        values[index][event.target.name] = event.target.value;
        setInputField(values);
    }

// function to handle submit when user clicks on submit button



function handleSubmit(event) {
    event.preventDefault();

    

            if (inputField.length === 1) {
                const nextId = getLastId() + 1;

                createRoster({...inputField[0], id: nextId})
                .then((roster) => {
                    dispatch({ type: "addRoster", data: roster });  
                })
                .catch((error) => console.log(error));
                
            } 
            
            if (inputField.length === 2) {
                const nextId = getLastId() + 1;

                createRoster({...inputField[0], id: nextId})
                .then((roster) => {
                    dispatch({ type: "addRoster", data: roster }); 
                })
                createRoster({...inputField[1], id: nextId + 1})
                .then((roster) => {
                    dispatch({ type: "addRoster", data: roster }); 
                })
                .catch((error) => console.log(error));
            } 
            
            if (inputField.length === 3) {
                const nextId = getLastId() + 1;

                createRoster({...inputField[0], id: nextId})
                .then((roster) => {
                    dispatch({ type: "addRoster", data: roster }); 
                })
                createRoster({...inputField[1], id: nextId + 1})
                .then((roster) => {
                    dispatch({ type: "addRoster", data: roster }); 
                })
                createRoster({...inputField[2], id: nextId + 2})
                .then((roster) => {
                    dispatch({ type: "addRoster", data: roster }); 
                })
                .catch((error) => console.log(error));
            }
    }

// function to add additional input fields to form

    const handleAddFields = () => {
        setInputField([...inputField, { event_id: "", start_time: "", end_time: "", role: "", name: ""}])
    }

// function to remove input fields from form

    const handleRemoveFields = (index) => {
        const values = [...inputField];
        values.splice(index, 1);
        setInputField(values);
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Add Team Members to Roster</Typography>

            <form onSubmit={handleSubmit}>

                { inputField.map((inputField, index) => (
                    
                    <div key={index} className={classes.root}> 

                        <InputLabel
                            id="event_id"
                            className={classes.field}
                        >
                            Select Occasion
                        </InputLabel>
                        <Select
                            labelId="event_id"
                            id="event_id"
                            name="event_id"
                            className={classes.field}
                            required
                            fullWidth
                            value={inputField.event_id}
                            onChange={event => handleChangeInput(index, event)}
                        >
                            {occasions.map((occasion) =>
                                <MenuItem key={occasion.id} value={occasion.id}>{occasion.name}, {occasion.date}</MenuItem>
                                )
                            }
                        </Select>


                        <InputLabel 
                            id="start_time"
                            className={classes.field}
                            > 
                            Start Time
                        </InputLabel>

                        <Select 
                            labelId ="start_time"
                            id="start_time"
                            label="start_time"
                            name="start_time"
                            className={classes.field}
                            required
                            fullWidth
                            value={inputField.start_time} 
                            onChange={event => handleChangeInput(index, event)}
                        >
                            {times.map((element, index) => 
                            <MenuItem key={index} value={element}>{element}</MenuItem>)}
                        </Select>


                        <InputLabel 
                            id="end_time"
                            className={classes.field}
                            > 
                            End Time
                        </InputLabel>

                        <Select 
                            labelId ="end_time"
                            id="end_time"
                            label="end_time"
                            name="end_time"
                            className={classes.field}
                            required
                            fullWidth
                            value={inputField.end_time} 
                            onChange={event => handleChangeInput(index, event)}
                        >
                            {times.map((element, index) => 
                            <MenuItem key={index} value={element}>{element}</MenuItem>)}
                        </Select>

                        <InputLabel 
                            id="role"
                            className={classes.field}
                            > 
                            Role
                        </InputLabel>

                        <Select 
                            labelId ="role"
                            id="role"
                            label="Role"
                            name="role"
                            className={classes.field}
                            required
                            fullWidth
                            value={inputField.role} 
                            onChange={event => handleChangeInput(index, event)}
                        >

                            <MenuItem value="waiter">Waiter</MenuItem>
                            <MenuItem value="bartender">Bartender</MenuItem>
                            <MenuItem value="chef">Chef</MenuItem>
                        </Select>
                        
                        <InputLabel 
                        id= "name"
                        className={classes.field}
                        >
                            Name
                        </InputLabel>
                        <Select
                            labelId= "name"
                            id="name"
                            label="Name"
                            name="name"
                            value={inputField.name}
                            className={classes.field}
                            required
                            fullWidth
                            onChange={event => handleChangeInput(index, event)}
                        >

                            {users.map((user, index) => 
                            <MenuItem key={index} value={user.first_name + " " + user.last_name}>{user.first_name}, {user.last_name}</MenuItem>)}

                        </Select>
                        {index > 0 ?
                        <IconButton
                            onClick={() => handleRemoveFields(index)}
                        >
                             <RemoveCircleOutlineIcon/> 
                        </IconButton> 
                        : 
                        null }
                        {index < 2 ? 
                        <IconButton
                            onClick={()=> handleAddFields()}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                        : null}
                    </div>
                
                ))}
                <Button 
                    variant= "contained" 
                    type="submit" 
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmit}
                >
                Add Shift
                </Button>
            </form>
            {console.log(inputField.length)}
            {console.log(users)}
        </Container>
    )
}