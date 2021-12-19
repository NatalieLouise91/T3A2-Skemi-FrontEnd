import React, { useReducer, useEffect } from "react";
import { StateContext } from "../utils/stateContext";
import stateReducer from "../utils/stateReducer";
import Nav from "./Nav";
import CreateOccasion from "./CreateOccasion";
import CreateRoster from "./CreateRoster";
import ViewOccasion from "./ViewOccasion";
import EventSchedule from "./EventSchedule";
import Home from "./Home";
import Login from "./Login";
import NewUser from "./NewUser";
import { getOccasions } from "../services/occasionServices";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const App = () => {
   const initialState = {
      occasions: [],
      loggedInUser: sessionStorage.getItem("user") || null,
      auth: { token: sessionStorage.getItem("token") || null }
   };

   const [store, dispatch] = useReducer(stateReducer, initialState);

   useEffect(() => {
      getOccasions()
         .then((occasions) =>
            dispatch({ type: "setOccasions", data: occasions })
         )
         .catch((error) => console.log(error));
   }, []);

   return (
      <div>
         <CssBaseline />
         <StateContext.Provider value={{ store, dispatch }}>
            <BrowserRouter>
               <Nav />
               <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/create-event" element={<CreateOccasion />} />
                  <Route path="/create-roster" element={<CreateRoster />} />
                  <Route path="/event-schedule" element={<EventSchedule />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/new-user" element={<NewUser />} />
                  <Route path="/event/:id" element={<ViewOccasion />} />
                  <Route
                     exact
                     path="event/update/:id"
                     element={<CreateOccasion />}
                  />
               </Routes>
            </BrowserRouter>
         </StateContext.Provider>
      </div>
   );
};

export default App;
