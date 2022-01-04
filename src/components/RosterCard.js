import React from "react";
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Typography } from '@material-ui/core';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


export default function RosterCard({ roster }) {

    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                    action={
                        <Link
                            to={`/rosters/${roster.id}`}
                        >
                            <IconButton>
                                <ExpandCircleDownOutlinedIcon/>
                            </IconButton>
                        </Link>
                    }
                    title={roster.name}
                    subheader={roster.role}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            {roster.start_time} - {roster.end_time}
                        </Typography>
                    </CardContent>
            </Card>
        </div>
    )
}
