
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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Rosters from './Rosters';
import ViewRoster from './ViewRoster';
import { getRosters } from '../services/rosterServices';
import { getUsers } from '../services/userServices';

const theme = createTheme({
  palette: {
     background: {
        default: "#FAFAFA",
     },
  },
});

const initialState = {
   occasions: [],
   loggedInUser: sessionStorage.getItem("user") || null,
   auth: { token: sessionStorage.getItem("token") || null }
};

const App = () => {
   const [store, dispatch] = useReducer(stateReducer, initialState);

   useEffect(() => {
    getOccasions()
       .then((occasions) =>
          dispatch({ type: "setOccasions", data: occasions })
       )
       .catch((error) => console.log(error));
   }, []);

   useEffect(() => {
    getUsers()
       .then((users) =>
          dispatch({ type: "setUsers", data: users })
       )
       .catch((error) => console.log(error));
   }, []);
   const logout = () => {
      dispatch({ type: "logout" })
   }

   return (
      <div>
         <CssBaseline />
         <StateContext.Provider value={{ store, dispatch }}>
            <BrowserRouter>
               <Nav
                  loggedInUser={store.loggedInUser}
                  logout={logout}
               />
               <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/create-event" element={<CreateOccasion />} />
                  <Route path="/create-roster" element={<CreateRoster />} />
                  <Route path="/event-schedule" element={<EventSchedule />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/new-user" element={<NewUser />} />
                  <Route path="/events/:id" element={<ViewOccasion />} />
                  <Route
                     exact
                     path="events/update/:id"
                     element={<CreateOccasion />}
                  />
               </Routes>
            </BrowserRouter>
         </StateContext.Provider>
      </div>
   );
};

export default App;

