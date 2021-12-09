export default function stateReducer(state, action) {
   switch (action.type) {
      case "setOccasionList": {
         return {
            ...state,
            occasionList: action.data,
         };
      }
      default:
         return state;
   }
}
