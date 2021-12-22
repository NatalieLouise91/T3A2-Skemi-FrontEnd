export default function reducer(state, action) {
   switch (action.type) {
      case "setOccasionList": {
         return {
            ...state,
            occasionList: action.data,
         };
      }
      case "addOccasion": {
         return {
            ...state,
            occasionList: action.data,
         };
      }

      // This callback/case is supposed to update the occasion list on state without occasion.id
      // case "deleteOccasion": {
      //    // const updatedOccasionList = state.occasionList.filter(
      //    //    (occasion) => occasion.id !== parseInt(action.data)
      //    // );
      //    return {
      //       ...state,
      //       occasionList: action.data,
      //       // updatedOccasionList,
      //    };
      // }
      case "setRosters": {
          return{
              ...state,
              rosters: action.data,
          };
      }
      
      case "addRoster": {
          return {
              ...state,
              rosters: action.data,
          };
      }



      case "setLoggedInUser": {
         return {
            ...state,
            loggedInUser: action.data,
         };
      }
      case "setToken": {
         return {
            ...state,
            auth: {
               ...state.auth,
               token: action.data,
            },
         };
      }
      default:
         return state;
   }
}
