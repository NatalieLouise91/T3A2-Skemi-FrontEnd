import React from "react";

const Occasion = ({ match, occasion }) => {
   console.log(match);

   return (
      <div>
         <p>{occasion.name}</p> - <p>{occasion.description}</p> -
         <p>{occasion.date}</p>
      </div>
   );
};

export default Occasion;
