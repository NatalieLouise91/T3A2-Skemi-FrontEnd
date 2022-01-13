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
import ViewRoster from './ViewRoster';
import { getRosters } from '../services/rosterServices';
import { getUsers } from '../services/userServices';
import EditRoster from './EditRoster';
import ViewUser from './ViewUser';


const theme = createTheme({
  palette: {
     background: {
        default: "#FAFAFA",
     },
  },
});

const App = () => {

   const initialState = {
      occasions: [],
      rosters: [],
      users: [],
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

   useEffect(() => {
      getRosters()
       .then((rosters) => dispatch({type: 'setRosters', data: rosters})
       )
       .catch((error) => console.log(error));
    }, []);

   return (
      <div>
         <ThemeProvider theme={theme}>
         <CssBaseline />
         <StateContext.Provider value={{ store, dispatch }}>
            <BrowserRouter>
               <Nav
                  loggedInUser={store.loggedInUser}
                  logout={logout}
               />
            <Routes>
              <Route exact path="/" element={<Home loggedInUser={store.loggedInUser}/>}/>
              <Route path="/create-event" element={<CreateOccasion />}/>
              <Route path="/create-roster" element={<CreateRoster />}/>
              <Route path="/event-schedule" element={<EventSchedule/>}/>
              <Route path="/rosters/:id" element={<ViewRoster/>}/>
              <Route 
               exact 
               path="rosters/update/:id"
               element={<EditRoster/>}
               />
              <Route path="/login" element={<Login/>}/>
              <Route path="/new-user" element={<NewUser/>}/>
              <Route path="/users/:id" element={<ViewUser />} />
              <Route path="/events/:id" element={<ViewOccasion />} />
              <Route 
              exact 
              path="events/update/:id"
              element={<CreateOccasion/>} 
              />
            </Routes>
          </BrowserRouter>
      </StateContext.Provider>
      </ThemeProvider>
    </div>
  );
};



export default App;