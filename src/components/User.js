import React from 'react'
import { Link } from "react-router-dom";
import {
    Grid,
    Container,
    Paper,
    Typography,
    Button,
 } from "@material-ui/core";


export default function User({ user }) {
    return (
        <div>
            <Typography align="center" variant="h5">
               Team Member Id: {user.id} | {user.first_name} {user.last_name}
            </Typography>
            <p>
               <strong>rosters:</strong> {user.id}
               {console.log(user)}
            </p>
            <Link
                to={`/users/${user.id}`}
                style={{ textDecoration: "none" }}
            >
                <Button
                     size="small"
                     type="submit"
                     variant="outlined"
                     color="primary"
                >
                     View
                </Button>
            </Link>
        </div>
    )
}
