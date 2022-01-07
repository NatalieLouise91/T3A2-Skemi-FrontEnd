import React from 'react'
import { Link } from "react-router-dom";
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
 } from "@material-ui/core";
 import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


export default function User({ user }) {
    return (

        <Card elevation={1}>
                <CardHeader
                    action={
                        <Link
                            to={`/users/${user.id}`}
                        >
                            <IconButton>
                                <ExpandCircleDownOutlinedIcon/>
                            </IconButton>
                        </Link>
                    }
                    title={user.first_name}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            {user.phone}
                        </Typography>
                    </CardContent>
            </Card>
    )
}
