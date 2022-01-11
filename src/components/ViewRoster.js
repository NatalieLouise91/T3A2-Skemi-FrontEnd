import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getRosterById, deleteRoster } from "../services/rosterServices";
import { useGlobalState } from "../utils/stateContext";
import ConfirmDialog from "./ConfirmDialog";

export default function ViewRoster() {
   const [roster, setRoster] = useState(null);
   const { id } = useParams();
   let navigate = useNavigate();
   const { store, dispatch } = useGlobalState();
   const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
   });
   const { loggedInUser } = store;

   useEffect(() => {
      getRosterById(id)
         .then((roster) => setRoster(roster))
         .catch((error) => console.log(error));
   }, [id]);

   if (!roster) return null;
   const removeRoster = () => {
      deleteRoster(id)
         .then(() => {
            dispatch({ type: "deleteRoster", data: id });
            navigate("/");
         })
         .catch((error) => console.log(error));
   };

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
                              setConfirmDialog({
                                 isOpen: true,
                                 title: "Are you sure to delete this record?",
                                 subTitle: "You can't undo this operation",
                                 onConfirm: () => {
                                    navigate(`/rosters/update/${id}`);
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
