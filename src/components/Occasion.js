//imports required dependencies and components
import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

// component to display data from occasion/event record 
const Occasion = ({ occasion }) => {
   return (
      <>
         <div>
            <Typography align="center" variant="h5">
               {occasion.name}
            </Typography>
            <p>
               <strong>Date: </strong> {occasion.date}
            </p>
            <p>Time: {occasion.time}</p>
            <div>
               <Link
                  to={`/events/${occasion.id}`}
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
         </div>
      </>
   );
};

export default Occasion;
