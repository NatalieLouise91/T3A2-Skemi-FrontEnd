import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function Notification(props) {
   const [notify, setNotify] = props;

   return (
      <Snackbar open={notify.isOpen} autoHideDuration={1000}>
         <Alert severity={notify.type}>{notify.message}</Alert>
      </Snackbar>
   );
}
