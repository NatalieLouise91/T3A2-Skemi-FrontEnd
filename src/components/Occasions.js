import React from "react";
import Occasion from "./Occasion";

const Occasions = ({ occasionList }) => {
   return (
      <div>
         <h1>Upcoming Events</h1>
         {occasionList.map((occasion, index) => (
            <Occasion key={index} occasion={occasion} />
         ))}
      </div>
   );
};

export default Occasions;
