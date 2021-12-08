export default function stateReducer(state, action) {
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
            occasionList: [action.data, ...state.occasionList],
         };
      }
      // case "setLoggedInUser": {
      //    return {
      //       ...state,
      //       loggedInUser: action.data,
      //    };
      // }
      // case "setToken": {
      //    return {
      //       ...state,
      //       auth: {
      //          ...state.auth,
      //          token: action.data,
      //       },
      //    };
      // }
      default:
         return state;
   }
}
