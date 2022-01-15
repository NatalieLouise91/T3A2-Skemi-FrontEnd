//import required dependencies and components
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import { getOccasionById } from "/Users/jordanhardy/Documents/coder/skemi/T3A2-Skemi-FrontEnd/src/services/occasionServices.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Spinner from "../UI/Spinner";

// sets mui theme for component
const useStyles = makeStyles({
   root: {
      background: "#45B39D",
      border: "1px solid #45B39D",
      borderRadius: "5px",
      color: "#02123B",
      textAlign: "center",
   },
});

// sets theme and props for mui components for styling
const ExpandMore = styled((props) => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
})(({ theme, expand }) => ({
   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
   marginLeft: "auto",
   transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
   }),
}));

// function renders a card component displaying the user roster
export default function UserRosterCard({ roster }) {
   // setting the display component state
   const [displayComponent, setDisplayComponent] = useState(false);

   // setting the display spinner state
   const [displaySpinner, setDisplaySpinner] = useState(false);

   // useEffect to set the interval for rendering the component
   useEffect(() => {
      setInterval(() => {
         setDisplayComponent(true);
      }, 10000);
   }, []);

   // useEffect to set the interval for rendering the spinner
   useEffect(() => {
      let time = 10;
      const timeValue = setInterval((interval) => {
         setDisplaySpinner(true);
         time = time - 1;
         if (time <= 0) {
            clearInterval(timeValue);
            setDisplaySpinner(false);
         }
      }, 1000);
   }, []);

   //date data variables
   const classes = useStyles();
   // const date = new Date();
   // const month = date.getMonth() + 1;
   // const day = date.getDate();
   // const year = date.getFullYear();

   // const currentDay = new Date(year, month, day);
   let dates = [];

   // //function gets data for date display
   // function getDates(startDate, daysToAdd) {
   //    for (let i = 0; i <= daysToAdd; i++) {
   //       let currentDate = new Date();
   //       currentDate.setDate(startDate.getDate() + i);
   //       let oldFormat =
   //          currentDate.getFullYear() +
   //          "/" +
   //          (currentDate.getMonth() + 1) +
   //          "/" +
   //          currentDate.getDate();
   //       let date = new Date(oldFormat);
   //       let dateString = new Date(
   //          date.getTime() - date.getTimezoneOffset() * 60000
   //       )
   //          .toISOString()
   //          .split("T")[0];
   //       dates.push(dateString);
   //    }

   //    return dates;
   // }

   //sets state for styling of roster card
   const [expanded, setExpanded] = React.useState(false);

   // handles click event and sets above state
   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   //state for handling occasion
   const [occasion, setOccasion] = useState();

   const messages = ["It's Today!", "It's Tomorrow!"];
   const id = roster.event_id;

   //side effect gets occasion id's
   useEffect(() => {
      getOccasionById(id)
         .then((occasion) => setOccasion(occasion))
         .catch((error) => console.log(error));
   }, [id]);

   if (!occasion) return null;

   return (
      <div>
         {displaySpinner && (
            <Grid
               container
               direction="column"
               justifyContent="center"
               alignItems="center"
            >
               <Spinner />
            </Grid>
         )}

         {displayComponent && (
            <Card elevation={1}>
               {occasion.date === dates[0] ? (
                  <CardHeader
                     className={classes.root}
                     subheader={messages[0]}
                  />
               ) : occasion.date === dates[1] ? (
                  <CardHeader
                     className={classes.root}
                     subheader={messages[1]}
                  />
               ) : (
                  <Divider component="CardHeader">
                     <CardHeader subheader={occasion.date} />
                  </Divider>
               )}
               <CardContent>
                  <Typography variant="body1" color="textSecondary">
                     <strong>{occasion.event_name}</strong>
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                     {roster.role}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                     {roster.start_time} - {roster.end_time}
                  </Typography>
               </CardContent>
               <CardActions disableSpacing>
                  <ExpandMore
                     expand={expanded}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label="show more"
                  >
                     <ExpandMoreIcon />
                  </ExpandMore>
               </CardActions>
               <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Divider>
                     <Typography variant="body2" color="textSecondary">
                        <strong>Details</strong>
                     </Typography>
                  </Divider>
                  <CardContent>
                     <Typography variant="body2" color="textSecondary">
                        <strong>Event Location: </strong>
                        {occasion.location}
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                        <strong>Contact: </strong>
                        {occasion.contact_name}
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                        <strong>Phone:</strong> {occasion.contact_phone}
                     </Typography>
                  </CardContent>
               </Collapse>
            </Card>
         )}
      </div>
   );
}
