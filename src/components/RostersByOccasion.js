import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import {
   Grid,
} from "@material-ui/core";
// import { getRosterById, deleteRoster } from "../services/rosterServices";

export default function RostersByOccasion() {

    const { id } = useParams();
    // const navigate = useNavigate();
    // const [roster, setRoster] = useState();
    const { store } = useGlobalState();
    const { rosters } = store; 

    // useEffect(() => {
    //     getRosterById(id)
    //        .then((roster) => setRoster(roster))
    //        .catch((error) => console.log(error));
    //  }, [id]);
  
    //  if (!roster) return null;
    //  const removeRoster = () => {
    //     deleteRoster(id)
    //        .then(navigate("/"))
    //        .catch((error) => console.log(error));
    //  };

    return (
        <Grid container spacing={2}>
            {rosters.map((roster) =>
                roster.event_id == id?
                <Grid item xs={8} key={roster.id}>{roster.name}, {roster.start_time} - {roster.end_time}</Grid> : null
            )
            }
        </Grid>
    )
}
