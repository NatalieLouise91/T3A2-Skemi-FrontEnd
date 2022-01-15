
// function sets cases with actions associated with different states throughout the application
export default function reducer(state, action) {
   switch (action.type) {
      //referenced in OccasionList.js
      case "setOccasions": {
         return {
            ...state,
            occasions: action.data,
         };
      }
      // referenced in OccasionList.js
      case "addOccasion": {
         return {
            ...state,
            occasions: action.data,
         };
      }
      // referenced in CreateOccasion
      case "updateOccasion": {
         const occasion = state.occasions.find(
            (occasion) => occasion.id === parseInt(action.data.id)
         );
         const theRest = state.occasions.filter(
            (occasion) => occasion.id !== parseInt(action.data.id)
         );
         const updatedOccasion = Object.assign(occasion, action.data);
         return {
            ...state,
            occasions: [updatedOccasion, ...theRest],
         };
      }
      // referenced in ViewOccasion
      case "deleteOccasion": {
         const updatedOccasions = state.occasions.filter((occasion) => {
            return occasion.id !== parseInt(action.data);
         });
         return {
            ...state,
            occasions: updatedOccasions,
         };
      }
      // referenced in App.js
      case "setRosters": {
         return {
            ...state,
            rosters: action.data,
         };
      }
      // referenced in CreateRoster.js
      case "addRoster": {
         return {
            ...state,
            rosters: action.data,
         };
      }
      // referenced in ViewRoster.js
      case "deleteRoster": {
         const updatedRosters = state.rosters.filter((roster) => {
            return roster.id !== parseInt(action.data);
         });
         return {
            ...state,
            rosters: updatedRosters,
         };
      }
      // referenced in EditRosterForm.js
      case "updateRoster": {
         const roster = state.rosters.find(
            (roster) => roster.id === action.data.id
         );
         const theRest = state.rosters.filter(
            (roster) => roster.id !== action.data.id
         );
         const updatedRoster = Object.assign(roster, action.data);
         return {
            ...state,
            rosters: [updatedRoster, ...theRest],
         };
      }
      // referenced in App.js
      case "setUsers": {
         return {
            ...state,
            users: action.data,
         };
      }
      // referenced in LoggedInTab.js, Nav.js, OccasionList.js
      case "setAdmin": {
         return {
            ...state,
            users: action.data,
         };
      }
      // referenced in App.js, Login.js, Nav.js
      case "login": {
         return {
            ...state,
            loggedInUser: action.data.email,
            auth: {
               ...state.auth,
               token: action.data.jwt,
            },
         };
      }
      // referenced in App.js, Login.js, Nav.js
      case "logout": {
         return {
            ...state,
            loggedInUser: null,
            auth: null,
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
