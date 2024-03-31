import { atom } from "recoil";

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '',// default value (aka initial value)
});

export const currentState = atom({
  key: "currentData",
  default: null
})

export const hourlyState = atom({
  key: "HourlyData",
  default: null,
})

export const climateState = atom({
  key: "forcastData",
  default: null,
})


