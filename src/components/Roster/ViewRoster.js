//import required dependencies and components
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getRosterById, deleteRoster } from "../../services/rosterServices";
import { useGlobalState } from "../../utils/stateContext";
import ConfirmDialog from "../UI/ConfirmDialog";

// function renders a specific roster records information based on an id
export default function ViewRoster() {
   //set state
   const [roster, setRoster] = useState(null);

   //params for occasion record id from url
   const { id } = useParams();
   let navigate = useNavigate();

   //destructuring dispatch and store called from global state
   const { store, dispatch } = useGlobalState();
   const { loggedInUser } = store;
  

   // state for confirm modal
   const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
   });

   //side effect to get specific roster record by roster id
   useEffect(() => {
      getRosterById(id)
         .then((roster) => setRoster(roster))
         .catch((error) => console.log(error));
   }, [id]);

   //function to handle deleting roster record from database
   if (!roster) return null;
   const onDelete = () => {
      deleteRoster(id)
         .then(() => {
            dispatch({ type: "deleteRoster", data: id });
            navigate("/");
         })
         .catch((error) => console.log(error));
   };

   //renders a card for a roster with relevant information from the database
   //  and buttons to delete the roster and edit the occasion or go back to all events
   return (
      <div>
         <Card elevation={1}>
            <CardHeader title={roster.name} subheader={roster.role} />
            <CardContent>
               <Typography variant="body2" color="textSecondary">
                  {roster.start_time} - {roster.end_time}
               </Typography>
               {loggedInUser === roster.author && (
                  <div>
                     <IconButton>
                        <EditOutlinedIcon
                           onClick={() => {
                              // nested callback functions to display a confirm action modal
                              //  then navigate to update form
                              setConfirmDialog({
                                 isOpen: true,
                                 title: "Are you sure to update this record?",
                                 subTitle: "You can't undo this operation",
                                 onConfirm: () => {
                                    navigate(`/rosters/update/${id}`);
                                 },
                              });
                           }}
                        />
                     </IconButton>
                     <IconButton>
                        <DeleteOutlineOutlinedIcon
                           onClick={() => {
                              // nested callback functions to display a confirm action modal
                              //  then navigate to update form
                              setConfirmDialog({
                                 isOpen: true,
                                 title: "Are you sure to delete this record?",
                                 subTitle: "You can't undo this operation",
                                 onConfirm: () => {
                                    onDelete(id);
                                 },
                              });
                           }}
                        />
                     </IconButton>
                  </div>
               )}
               {console.log(roster)}
            </CardContent>
         </Card>
         <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
         />
      </div>
   );
}
