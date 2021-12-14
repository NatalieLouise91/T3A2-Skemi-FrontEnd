import React, { useReducer } from 'react';
import { StateContext } from '../utils/stateContext';
import stateReducer from '../utils/stateReducer';
import Nav from './Nav';
import CreateOccasion from './CreateOccasion';
import CreateRoster from './CreateRoster';
import ViewOccasion from './ViewOccasion';
import EventSchedule from './EventSchedule';
import Home from './Home';
import Login from './Login';
import NewUser from './NewUser';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

const App = () => {

  const initialState = {
    loggedInUser: null,
    auth: {token: null}
  }

  const [store, dispatch] = useReducer(stateReducer, initialState);

  return (
    <div >
      <StateContext.Provider value={{store, dispatch}}>
          <BrowserRouter>
            <Nav/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/create-event" element={<CreateOccasion />}/>
              <Route path="/create-roster" element={<CreateRoster />}/>
              <Route path="/event-schedule" element={<EventSchedule/>}/>
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
