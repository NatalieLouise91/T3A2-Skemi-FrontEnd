import React, { useState, useEffect } from "react";
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
    Typography,
    Grid,
    Paper,
} from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Spinner from "./Spinner";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
    },
    alert: {
        color: '#DC143C'
    },
}))

export default function CreateRoster() {

    const times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]

    const classes = useStyles();

    

    const [inputField, setInputField] = useState([
        { event_id: "", start_time: "", end_time: "", role: "", name: "", user_id: "", author: ""},
    ]);

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const { dispatch, store } = useGlobalState();
    const { loggedInUser } = store;
    const { rosters } = store; 
    const { occasions } = store;
    const { users } = store;
    

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

function handleSubmit(e) {
    e.preventDefault();
    if (inputField.length === 1) {
        setFormErrors(validate(inputField[0]));
        setIsSubmit(true)
    }
    if (inputField.length === 2) {
        setFormErrors(validate(inputField[0]));
        setFormErrors(validate(inputField[1]));
        setIsSubmit(true)
    }
    if (inputField.length === 3) {
        setFormErrors(validate(inputField[0]));
        setFormErrors(validate(inputField[1]));
        setFormErrors(validate(inputField[2]));
        setIsSubmit(true)
    }
  }

useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        if (inputField.length === 1) {
            const nextId = getLastId() + 1;

            createRoster({...inputField[0], id: nextId})
            .then((roster) => {
                dispatch({ type: "addRoster", data: roster }); 
                navigate('/')
                window.location.reload(); 
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
                navigate('/')
                window.location.reload();
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
                navigate('/')
                window.location.reload();
            })
            .catch((error) => console.log(error));
        }
 }
},[formErrors])

// validate function to set error messages if user incorrectly enters in a field

const validate = (values) => {
    const errors = {}
    if(!values.event_id) {
        errors.event_id = "An event name is required!";
    } 
    if(!values.start_time) {
        errors.start_time = "A start time is required!";
    } 
    if(!values.end_time) {
        errors.end_time = "An end time is required!";
    } 
    if(!values.role) {
        errors.role = "A job role is required!";
    } 
    if(!values.name) {
        errors.name = "A team member is required!";
    }
    if(!values.user_id) {
        errors.user_id = "Please confirm the team member!";
    }
    if(!values.author) {
        errors.author = "Please select your email for authorship";
    }
    return errors;
}


// function to add additional input fields to form

    const handleAddFields = () => {
        setInputField([...inputField, { event_id: "", start_time: "", end_time: "", role: "", name: "", user_id: "", author: ""}])
    }

// function to remove input fields from form

    const handleRemoveFields = (index) => {
        const values = [...inputField];
        values.splice(index, 1);
        setInputField(values);
    }

    // setting the display component state
   const [displayComponent, setDisplayComponent] = useState(false);

   // setting the display spinner state
      const [displaySpinner, setDisplaySpinner] = useState(false);
   
   // useEffect to set the interval for rendering the component
   
      useEffect(() => {
         setInterval(() => {
            setDisplayComponent(true);
         }, 7000);
      }, []);
   
   // useEffect to set the interval for rendering the spinner
       useEffect(() => {
           let time = 5;
           const timeValue = setInterval((interval) => {
               setDisplaySpinner(true);
               time = time - 1;
               if (time <= 0) {
                   clearInterval(timeValue);
                   setDisplaySpinner(false);
               }
       }, 1000); },[]);

    return (
        <Container maxWidth="sm">

            {displaySpinner && 
            
                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center" 
                    alignItems="center"
                >
                    <Spinner />
                </Grid>
            
            }

            {displayComponent &&

        
        <Paper elevation={5} style={{ padding: 24, marginTop: 24 }}>

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
                                <MenuItem key={occasion.id} value={occasion.id}>{occasion.name}, at {occasion.time} on {occasion.date}</MenuItem>
                                )
                            }
                        </Select>
                        {formErrors.event_id &&
                            <p className={classes.alert}><ErrorOutlineIcon fontSize='small'/>  {formErrors.event_id}</p>
                        }

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

                        {formErrors.start_time &&
                            <p className={classes.alert}><ErrorOutlineIcon fontSize='small'/> {formErrors.start_time}</p>
                        }


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

                        {formErrors.end_time &&
                            <p className={classes.alert}><ErrorOutlineIcon fontSize='small'/> {formErrors.end_time}</p>
                        }

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

                            <MenuItem value="Waiter">Waiter</MenuItem>
                            <MenuItem value="Bartender">Bartender</MenuItem>
                            <MenuItem value="Chef">Chef</MenuItem>
                        </Select>

                        {formErrors.role &&
                            <p className={classes.alert}><ErrorOutlineIcon fontSize='small'/> {formErrors.role}</p>
                        }
                        
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

                        {formErrors.name &&
                            <p className={classes.alert}><ErrorOutlineIcon fontSize='small'/> {formErrors.name}</p>
                        }

                        <InputLabel 
                        id= "user_id"
                        className={classes.field}
                        >
                            Confirm Team Member
                        </InputLabel>
                        <Select
                            labelId= "user_id"
                            id="user_id"
                            label="Team Member Id"
                            name="user_id"
                            value={inputField.user_id}
                            className={classes.field}
                            required
                            fullWidth
                            onChange={event => handleChangeInput(index, event)}
                        >

                            {users.map((user, index) => 
                            <MenuItem key={index} value={user.id}>{user.first_name}, {user.last_name}</MenuItem>)}

                        </Select>

                        {formErrors.user_id &&
                            <p className={classes.alert}><ErrorOutlineIcon fontSize='small'/> {formErrors.user_id}</p>
                        }

                        <InputLabel 
                        id= "author"
                        className={classes.field}
                        >
                            Author
                        </InputLabel>
                        <Select
                            labelId= "author"
                            id="author"
                            label="Author"
                            name="author"
                            value={inputField.author}
                            className={classes.field}
                            required
                            fullWidth
                            onChange={event => handleChangeInput(index, event)}
                        >
                            <MenuItem value={loggedInUser}>{loggedInUser}</MenuItem>

                        </Select>

                        {formErrors.author &&
                            <p className={classes.alert}><ErrorOutlineIcon fontSize='small'/> {formErrors.author}</p>
                        }

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
                Add to Roster
                </Button>
            </form>
            </Paper>
            }
            
        </Container>
                        
    )
}