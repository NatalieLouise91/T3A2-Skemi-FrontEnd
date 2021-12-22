import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { createRoster } from "../services/rosterServices"
import { getOccasions } from "../services/occasionServices";
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
        { select_occasion: "", start_time: "", end_time: "", role: "", name: ""},
    ]);

    const { dispatch, store } = useGlobalState();
    const { occasionList } = store;

    useEffect(() => {
        getOccasions()
           .then((events) => {
              dispatch({
                 type: "setOccasionList",
                 data: events,
              });
              console.log(events);
           })
           .catch((error) => {
              console.log(error);
           });
     }, []);

    let navigate = useNavigate();
    console.log(dispatch);

    const handleChangeInput = (index, event) => {
        const values = [...inputField];
        values[index][event.target.name] = event.target.value;
        setInputField(values);
    }

    function handleSubmit(event) {
        event.preventDefault();
        createRoster(inputField)
            .then((roster) => {
                dispatch({ 
                    type: "addRoster", 
                    data: roster
                })
                navigate("/");   
            })
            .catch((error) => console.log(error))
    }


    const handleAddFields = () => {
        setInputField([...inputField, { select_occasion: "", start_time: "", end_time: "", role: "", name: ""}])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputField];
        values.splice(index, 1);
        setInputField(values);
    }

    
    const values = Object.values(occasionList);

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Add Team Members to Roster</Typography>

            <form className={classes.root} onSubmit={handleSubmit}>

                { inputField.map((inputField, index) => (
                    <div key={index}>

                        <InputLabel
                            id="select_occasion"
                            className={classes.field}
                        >
                            Select Occasion
                        </InputLabel>
                        <Select
                            labelId="select_occasion"
                            id="select_occasion"
                            name="select_occasion"
                            className={classes.field}
                            required
                            fullWidth
                            value={inputField.select_occasion}
                            onChange={event => handleChangeInput(index, event)}
                        >
                            {values.map((element, index) =>
                                <MenuItem key={index} value={element}>{element}</MenuItem>)
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