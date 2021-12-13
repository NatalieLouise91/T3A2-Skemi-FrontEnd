import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Occasion = ({ occasion }) => {
   return (
      <>
         <div>
            <p>
               <strong>Event:</strong> {occasion.name}
            </p>
            <p>
               <strong>Description:</strong> {occasion.description}
            </p>
            <p>
               <strong>Date:</strong> {occasion.date}
            </p>
            {/* <p>{occasion.attendees}</p>
            <p>{occasion.location}</p>
            <p>{occasion.time}</p>
            <p>{occasion.contact_name}</p>
            <p>{occasion.contact_phone}</p> */}
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