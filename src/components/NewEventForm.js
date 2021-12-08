import React, { useState } from "react";

const NewEventForm = (props) => {
   const [event, setEvent] = useState(props.initialFormState);

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEvent({ ...event, [name]: value });
   };

   return (
      <form
         onSubmit={(event) => {
            event.preventDefault();
            if (!event.name || !event.description) return;
            props.addEvent(event);
            setEvent(props.initialFormState);
         }}
      >
         <label>Company</label>
         <input
            type="text"
            name="company"
            value={event.company}
            onChange={handleInputChange}
         ></input>
         <label>Position</label>
         <input
            type="text"
            name="position"
            value={event.position}
            onChange={handleInputChange}
         ></input>
         <label>Description</label>
         <input
            type="text"
            name="description"
            value={event.description}
            onChange={handleInputChange}
         ></input>
         <button>Create Event</button>
      </form>
   );
};

export default NewEventForm;
