import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <div>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    </div>
  );
}
