import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import initialOccasionList from "../data/initial_occasions.json";
import Occasions from "./Occasions";
import CreateOccasionForm from "./CreateOccasionForm";
import About from "./About";
import stateReducer from "../utils/stateReducer";
// import Occasion from "./Occasion";

const App = () => {
   // const [occasionList, setOccasionList] = useState([]);

   const initialState = {
      occasionList: [],
   };
   const [store, dispatch] = useReducer(stateReducer, initialState);
   const { occasionList } = store;

   const addOccasion = (name, description, date) => {
      const occasion = {
         name: name,
         description: description,
         date: date,
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
      dispatch({
         type: "setOccasionList",
         data: initialOccasionList,
      });
      // setOccasionList(initialOccasionList);
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
                  path="/"
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
