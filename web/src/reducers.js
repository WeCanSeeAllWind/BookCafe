import { createContext } from "react";

export const Context = createContext();

export const initialState = {
  sessionId: "elice",
  isLogin: false
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'session':{
      return {
        ...state,
        sessionId: action.payload
      }}
    case 'isLogin':{
      return {
        ...state,
        isLogin: action.payload
      }}  
    default:
      return state;
  }
}