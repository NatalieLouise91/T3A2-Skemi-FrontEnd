import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { updateRoster } from "../services/rosterServices"
import { getRosterById } from "../services/rosterServices"
import "@fontsource/roboto/400.css";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Button,
    Select,
    InputLabel,
    MenuItem,
} from "@material-ui/core";


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

export default function EditRosterForm() {


    const initialFormData = {
        event_id: "", 
        start_time: "", 
        end_time: "", 
        name: "",
        user_id: "", 
        role: "",
    }

    const [formData, setFormData] = useState(initialFormData)
    const {dispatch, store } = useGlobalState();
    const { occasions } = store;
    const { users } = store;
    let navigate = useNavigate();
    let { id } = useParams();
    
    useEffect(() => {
        if (id) {
           getRosterById(id).then((roster) => {
              setFormData({
                event_id: roster.event_id, 
                start_time: roster.start_time, 
                end_time: roster.end_time, 
                name: roster.name, 
                user_id: roster.user_id,
                role: roster.role
              });
           });
        }
     }, [id]);

     console.log(id)

    const times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]

    const classes = useStyles();

    console.log(formData)
    console.log(id)



// function to handle the change of input when user fills out form

function handleFormData(event) {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    })
}
    
// function to handle submit when user clicks on submit button


function handleSubmit(event) {
    event.preventDefault();

            if(id) {
                updateRoster({ id: id, ...formData}).then((roster) => {
                    dispatch({ type: "updateRoster", data: { id: id, ...formData} });
                    navigate(`/rosters/${id}`);
                })
                .catch((error) => console.log(error));
            }
    }

    return (

        
        <form onSubmit={handleSubmit}>
            {/* {(!roster) ? null :  */}

            <div>
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
                            value={formData.event_id}
                            onChange={handleFormData}
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
                            value={formData.start_time} 
                            onChange={handleFormData}
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
                            value={formData.end_time} 
                            onChange={handleFormData}
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
                            value={formData.role} 
                            onChange={handleFormData}
                        >

                            <MenuItem value="Waiter">Waiter</MenuItem>
                            <MenuItem value="Bartender">Bartender</MenuItem>
                            <MenuItem value="Chef">Chef</MenuItem>
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
                            value={formData.name}
                            className={classes.field}
                            required
                            fullWidth
                            onChange={handleFormData}
                        >

                            {users.map((user, index) => 
                            <MenuItem key={index} value={user.first_name + " " + user.last_name}>{user.first_name}, {user.last_name}</MenuItem>)}

                        </Select>
                        <InputLabel 
                        id= "user_id"
                        className={classes.field}
                        >
                            Confirm Team Member
                        </InputLabel>
                        <Select
                            labelId= "user_id"
                            id="user_id"
                            label="Confirm Team Member"
                            name="user_id"
                            value={formData.user_id}
                            className={classes.field}
                            required
                            fullWidth
                            onChange={handleFormData}
                        >

                            {users.map((user, index) => 
                            <MenuItem key={index} value={user.id}>{user.first_name}, {user.last_name}</MenuItem>)}

                        </Select>
                <Button 
                    variant= "contained" 
                    type="submit" 
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmit}
                >
                Edit Shift
                </Button>
            </div>
        {/* } */}
        </form>

    )
}
