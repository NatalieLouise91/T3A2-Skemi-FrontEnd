import React, { useReducer, useEffect } from 'react';
import { StateContext } from '../utils/stateContext';
import stateReducer from '../utils/stateReducer';
import { getRosters } from '../services/rosterServices';
import Nav from './Nav';
import CreateOccasion from './CreateOccasion';
import CreateRoster from './CreateRoster';
import ViewOccasion from './ViewOccasion';
import EventSchedule from './EventSchedule';
import Home from './Home';
import Login from './Login';
import NewUser from './NewUser';
import Rosters from './Rosters';
import ViewRoster from './ViewRoster';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const App = () => {
   const initialState = {
      rosters: [],
      loggedInUser: null,
      auth: { token: null },
   };

   const [store, dispatch] = useReducer(stateReducer, initialState);

   useEffect(() => {
     getRosters()
      .then((rosters) => dispatch({type: 'setRosters', data: rosters}))
      .catch((error) => console.log(error))
   }, [])

  return (
    <div>
      <CssBaseline />
      <StateContext.Provider value={{store, dispatch}}>
          <BrowserRouter>
            <Nav/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/create-event" element={<CreateOccasion />}/>
              <Route path="/create-roster" element={<CreateRoster />}/>
              <Route path="/event-schedule" element={<EventSchedule/>}/>
              <Route path="/rosters" element={<Rosters/>}/>
              <Route path="/rosters/:id" element={<ViewRoster/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/new-user" element={<NewUser/>}/>
              <Route path="/events/:id" element={<ViewOccasion />} />
            </Routes>
          </BrowserRouter>
      </StateContext.Provider>
    </div>
  )
}

export default App
