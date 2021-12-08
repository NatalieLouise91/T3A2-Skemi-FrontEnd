import React, { useState } from "react";

const CreateOccasionForm = ({ history, addOccasion }) => {
   const [enteredName, setEnteredName] = useState("");
   const [enteredDescription, setEnteredDescription] = useState("");
   const [enteredDate, setEnteredDate] = useState("");
   const [enteredAttendees, setEnteredAttendees] = useState("");
   const [enteredLocation, setEnteredLocation] = useState("");
   const [enteredTime, setEnteredTime] = useState("");
   const [enteredContactName, setEnteredContactName] = useState("");
   const [enteredContactPhone, setEnteredContactPhone] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      addOccasion(enteredName, enteredDate, enteredDescription);
      setEnteredName("");
      setEnteredDescription("");
      setEnteredDate("");
      setEnteredAttendees("");
      setEnteredLocation("");
      setEnteredTime("");
      setEnteredContactName("");
      setEnteredContactPhone("");
      // return history.push("/");
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
   const attendeesChangeHandler = (e) => {
      setEnteredAttendees(e.target.value);
   };
   const locationChangeHandler = (e) => {
      setEnteredLocation(e.target.value);
   };
   const timeChangeHandler = (e) => {
      setEnteredTime(e.target.value);
   };
   const contactNameChangeHandler = (e) => {
      setEnteredContactName(e.target.value);
   };
   const contactPhoneChangeHandler = (e) => {
      setEnteredContactPhone(e.target.value);
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
                  id="description"
                  type="text"
                  value={enteredDescription}
                  placeholder="Event description"
                  onChange={descriptionChangeHandler}
               ></input>
            </label>
            <label>
               Event Date:
               <input
                  id="date"
                  type="text"
                  value={enteredDate}
                  placeholder="Event date"
                  onChange={dateChangeHandler}
               ></input>
            </label>
            <label>
               Number of Attendees:
               <input
                  id="attendees"
                  type="text"
                  value={enteredAttendees}
                  placeholder="# attendees"
                  onChange={attendeesChangeHandler}
               ></input>
            </label>
            <label>
               Location:
               <input
                  id="location_"
                  type="text"
                  value={enteredLocation}
                  placeholder="Location Details"
                  onChange={locationChangeHandler}
               ></input>
            </label>
            <label>
               Time:
               <input
                  id="time"
                  type="text"
                  value={enteredTime}
                  placeholder="Event time"
                  onChange={timeChangeHandler}
               ></input>
            </label>
            <label>
               Primary Contact:
               <input
                  id="contact_name"
                  type="text"
                  value={enteredContactName}
                  placeholder="Contact name"
                  onChange={contactNameChangeHandler}
               ></input>
            </label>
            <label>
               Primary Contact Phone:
               <input
                  id="contact_phone"
                  type="text"
                  value={enteredContactPhone}
                  placeholder="Contact phone #"
                  onChange={contactPhoneChangeHandler}
               ></input>
            </label>
            <button type="submit">Create Event</button>
         </form>
      </div>
   );
};

export default CreateOccasionForm;
