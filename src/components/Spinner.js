import React, {useEffect, useRef} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography, Grid, Paper } from '@material-ui/core';
import { init } from 'ityped';

export default function Spinner() {

    const textRef = useRef();

    useEffect(() => {
        init(textRef.current, {
            showCursor: false,
            strings: ["Loading..."]
        })
    },[])

  return (
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
                    <Typography variant="h6"><span ref={textRef}></span></Typography>
                </Grid>
            </Grid>
        </Paper>
  );
}


