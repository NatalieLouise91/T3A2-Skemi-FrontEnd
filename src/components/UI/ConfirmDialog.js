// importing required dependencies
import React from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Typography,
   makeStyles,
   IconButton,
   Button,
} from "@material-ui/core";
import EditOffIcon from "@mui/icons-material/EditOff";

const useStyles = makeStyles((theme) => ({
   dialog: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
   },
   dialogTitle: {
      textAlign: "center",
   },
   dialogContent: {
      textAlign: "center",
   },
   dialogAction: {
      justifyContent: "center",
   },
   titleIcon: {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.secondary.main,
      "&:hover": {
         backgroundColor: theme.palette.secondary,
         cursor: "default",
      },
      "& .MuiSvgIcon-root": {
         fontSize: "8rem",
      },
   },
}));

//beginning component function
export default function ConfirmDialog(props) {
   //sets state and classes for mui theme
   const { confirmDialog, setConfirmDialog } = props;
   const classes = useStyles();

   //returns basic modal component for confirm action on update and delete operations over multiple components
   return (
      <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
         <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
               <EditOffIcon />
            </IconButton>
         </DialogTitle>
         <DialogContent className={classes.dialogContent}>
            <Typography variant="h6">{confirmDialog.title}</Typography>
            <Typography variant="subtitle2">
               {confirmDialog.subTitle}
            </Typography>
         </DialogContent>
         <DialogActions className={classes.dialogAction}>
            <Button
               color="secondary"
               onClick={confirmDialog.onConfirm}
               variant="outlined"
            >
               Yes
            </Button>
            <Button
               variant="outlined"
               color="default"
               onClick={() =>
                  setConfirmDialog({ ...confirmDialog, isOpen: false })
               }
            >
               Cancel
            </Button>
         </DialogActions>
      </Dialog>
   );
}
