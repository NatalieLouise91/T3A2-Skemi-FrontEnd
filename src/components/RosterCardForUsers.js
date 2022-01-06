import React from "react";
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';


export default function RosterCardForUsers({ roster }) {

    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                    title={roster.role}
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