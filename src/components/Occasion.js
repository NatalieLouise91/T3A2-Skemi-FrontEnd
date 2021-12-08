import React from "react";

const Occasion = ({ occasion }) => {

   return (
      <div>
         <p>{occasion.name}</p>
         <p>{occasion.description}</p>
         <p>{occasion.date}</p>
         <p>{occasion.attendees}</p>
         <p>{occasion.location}</p>
         <p>{occasion.time}</p>
         <p>{occasion.contact_name}</p>
         <p>{occasion.contact_phone}</p>
      </div>
   );
};

export default Occasion;
