import React from "react";
import "@fontsource/roboto/400.css";
import { 
    Container,
    Typography
} from "@material-ui/core";
import EditRosterForm from "./EditRosterForm";

export default function EditRoster() {

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Edit Shift</Typography>
            <EditRosterForm />
        </Container>
    )
}
