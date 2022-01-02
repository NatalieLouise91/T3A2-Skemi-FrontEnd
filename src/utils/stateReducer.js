export default function reducer(state, action) {
   switch (action.type) {
      case "setOccasions": {
         return {
            ...state,
            occasions: action.data,
         };
      }
      case "addOccasion": {
         return {
            ...state,
            occasions: action.data,
         };
      }
      case "updateOccasion": {
         const occasion = state.occasions.find((occasion) => occasion.id === parseInt(action.data.id));
         const theRest = state.occasions.filter(
            (occasion) => occasion.id !== parseInt(action.data.id)
         );
         const updatedOccasion = Object.assign(occasion, action.data);
         return {
            ...state,
            occasions: [updatedOccasion, ...theRest],
         };
      }
      // This callback/case is supposed to update the occasion list on state without occasion.id
      // case "deleteOccasion": {
      //    // const updatedoccasions = state.occasions.filter(
      //    //    (occasion) => occasion.id !== parseInt(action.data)
      //    // );
      //    return {
      //       ...state,
      //       occasions: action.data,
      //       // updatedoccasions,
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

      case 'login': {
         return {
            ...state,
            loggedInUser: action.data.email,
            auth: {
               ...state.auth,
               token: action.data.jwt
            }
         }
      }

      case "logout": {
         return {
            ...state,
            loggedInUser: null,
            auth: null,
         }
      }

      default:
         return state;
   }
}
