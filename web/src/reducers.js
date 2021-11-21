import { createContext } from "react";

export const Context = createContext();

export const initialState = {
  sessionId: "elice"
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'session':{
      return {
        ...state,
        sessionId: action.payload
      }}
    default:
      return state;
  }
}