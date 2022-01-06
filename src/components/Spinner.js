import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography, Grid, Paper } from '@material-ui/core';

export default function Spinner() {
  return (
    // <div>
    //     <Box sx={{ display: 'flex' }}>
    //         <CircularProgress />
    //     </Box>
    // </div>
        <Paper spacing={2} elevation={5} style={{ padding: 24, marginTop: 25, width: '70%', height: '70%' }}>
            <Grid 
                container 
                direction="column" 
                justifyContent="center" 
                alignItems="center"
                spacing={2}
            >
                <Grid >
                    <div>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </div>
                </Grid>
                <Grid>
                    <Typography>Loading Rosters...</Typography>
                </Grid>
            </Grid>
        </Paper>
  );
}


