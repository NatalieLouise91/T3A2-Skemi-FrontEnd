import {createContext, useContext} from 'react';

//connects global state
export const StateContext = createContext();

export const useGlobalState = () => useContext(StateContext);