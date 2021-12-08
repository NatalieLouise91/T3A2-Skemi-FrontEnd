import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = (props) => {
   useEffect(() => {
      axios.get("/api/events").then((res) => setEvents(res.data));
   }, []);

   const [events, setEvents] = useState([]);

   return (
      <div>
         <div>
            {events.map((event, index) => (
               <div key={index}>
                  {event.name} | {event.description}
               </div>
            ))}
         </div>
      </div>
   );
};
export default EventList;
