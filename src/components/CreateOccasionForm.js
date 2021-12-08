import React, { useState } from "react";

const CreateOccasionForm = ({ history, addOccasion }) => {
   const [enteredName, setEnteredName] = useState("");
   const [enteredDescription, setEnteredDescription] = useState("");
   const [enteredDate, setEnteredDate] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      addOccasion(enteredName, enteredDate, enteredDescription);
      setEnteredName("");
      setEnteredDescription("");
      setEnteredDate("");
   };

   const nameChangeHandler = (e) => {
      setEnteredName(e.target.value);
   };
   const descriptionChangeHandler = (e) => {
      setEnteredDescription(e.target.value);
   };
   const dateChangeHandler = (e) => {
      setEnteredDate(e.target.value);
   };

   return (
      <div>
         <h1>Create a New Event</h1>
         <form onSubmit={handleSubmit}>
            <label>
               Event Name:
               <input
                  id="name"
                  type="text"
                  value={enteredName}
                  placeholder="Event name"
                  onChange={nameChangeHandler}
               ></input>
            </label>
            <label>
               Event Description:
               <input
                  id="name"
                  type="text"
                  value={enteredDescription}
                  placeholder="Event description"
                  onChange={descriptionChangeHandler}
               ></input>
            </label>
            <label>
               Event Date:
               <input
                  id="name"
                  type="text"
                  value={enteredDate}
                  placeholder="Event date"
                  onChange={dateChangeHandler}
               ></input>
            </label>
            <button type="submit">Create Event</button>
         </form>
      </div>
   );
};

export default CreateOccasionForm;
