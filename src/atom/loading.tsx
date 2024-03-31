import { atom } from "recoil";


export const Loading =  atom({
    key: 'loading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });