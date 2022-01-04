import React from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import {
   Grid,
   Container,
} from "@material-ui/core";
import RosterCard from "./RosterCard";

export default function RostersByOccasion() {

    const { id } = useParams();
    const { store } = useGlobalState();
    const { rosters } = store; 

    return (
        <Container>
            <Grid container spacing={3}>
                    {rosters.map((roster) =>
                    roster.event_id == id?
                            <Grid key={roster.id} item xs={12} sm={6} md={3}>
                                <RosterCard roster={roster} />
                            </Grid>
                    : null
                )
                }
            </Grid>
        </Container>
    )
}
