import React, { useReducer } from "react";
import { StateContext } from "../utils/stateContext";
import stateReducer from "../utils/stateReducer";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateOccasion from "./CreateOccasion";

const App = () => {
   const initialState = {
      loggedInUser: null,
      auth: { token: null },
   };

   const [store, dispatch] = useReducer(stateReducer, initialState);

   return (
      <div>
         <StateContext.Provider value={{ store, dispatch }}>
            <BrowserRouter>
               <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/create-event" element={<CreateOccasion />} />
               </Routes>
            </BrowserRouter>
         </StateContext.Provider>
      </div>
   );
};

export default App;
