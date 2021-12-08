import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import initialOccasionList from "../data/initial_occasions.json";
import Occasions from "./Occasions";
import CreateOccasionForm from "./CreateOccasionForm";
import About from "./About";
import stateReducer from "../utils/stateReducer";
import { getOccasions } from "../services/occasionServices";
// import Occasion from "./Occasion";

const App = () => {
   // const [occasionList, setOccasionList] = useState([]);

   const initialState = {
      occasionList: [],
   };
   const [store, dispatch] = useReducer(stateReducer, initialState);
   const { occasionList } = store;

   const addOccasion = (
      name,
      description,
      date,
      attendees,
      locaton_,
      time,
      contact_name,
      contact_phone
   ) => {
      const occasion = {
         name: name,
         description: description,
         date: date,
         attendees: attendees,
         // location: location, LOCATION IS A GLOBAL KEYWORD AND CANNOT BE USED?
         time: time,
         contact_name: contact_name,
         contact_phone: contact_phone,
      };

      dispatch({
         type: "addOccasion",
         data: occasion,
      });
      // setOccasionList((prevOccasionList) => {
      //    return [
      //       ...prevOccasionList,
      //       { name: name, description: description, date: date },
      //    ];
      // });
   };

   useEffect(() => {
      getOccasions()
         .then((events) => {
            dispatch({
               type: "setOccasionList",
               data: events,
            });
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   // const getOccasionById = (id) => {
   //    return occasionList.find((occasion) => occasion.id === id);
   // };

   return (
      <div>
         <BrowserRouter>
            <CreateOccasionForm addOccasion={addOccasion} />
            <Routes>
               <Route
                  exact
                  path="/events"
                  element={<Occasions occasionList={occasionList} />}
               />
               <Route exact path="/about" element={<About />} />
               <Route
                  exact
                  path="/newevent"
                  element={<CreateOccasionForm addOccasion={addOccasion} />}
               />
               {/* <Route exact path="/events/:id"
               element={<Occasion occasionList={occasionList.find(occasion=>occasion.id == props.match.params.id)} />}
               /> */}
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
