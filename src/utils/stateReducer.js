export default function reducer (state, action) {
    switch(action.type) {
        
        case "setOccasionList": {
            return {
               ...state,
               occasionList: action.data,
            };
         }
         case "deleteOccasion": {
            const updatedOccasionList = state.occasionList.filter(
               (occasion) => occasion.id !== parseInt(action.data)
            );
            return {
               ...state,
               occasionList: updatedOccasionList,
            };
         }
         
        case 'setLoggedInUser': {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case 'setToken': {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    token: action.data
                }
            }
        }
        default: return state
    }
}