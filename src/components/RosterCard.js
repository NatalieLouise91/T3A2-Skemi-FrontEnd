//import required dependencies and components
import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

// function to render information on mui components from the roster record
export default function RosterCard({ roster }) {
   return (
      <div>
         <Card elevation={1}>
            <CardHeader
               action={
                  <Link to={`/rosters/${roster.id}`}>
                     <IconButton>
                        <ExpandCircleDownOutlinedIcon />
                     </IconButton>
                  </Link>
               }
               title={roster.name}
               subheader={roster.role}
            />
            <CardContent>
               <Typography
                  data-testid="roster-card-typography"
                  variant="body2"
                  color="textSecondary"
               >
                  {roster.start_time} - {roster.end_time}
               </Typography>
            </CardContent>
         </Card>
      </div>
   );
}
