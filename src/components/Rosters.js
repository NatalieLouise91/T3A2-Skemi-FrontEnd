import React from 'react';
import Roster from './Roster';
import { useGlobalState } from '../utils/stateContext';
import { Grid, Paper } from "@material-ui/core";

export default function Rosters() {
    const {store} = useGlobalState();
    const {rosters} = store;
    return (
        <Grid container>
            {rosters.map((roster, index) => {
                return (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Paper style={{ padding: 24, marginTop: 24 }} elevation={5}>
                            <Roster index={index} roster={roster} />
                        </Paper>
                    </Grid>                 
                )
            })}
        </Grid>        
    )
}