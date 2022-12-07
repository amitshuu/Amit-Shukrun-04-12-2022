import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleDayAndNight: 'day',
  toggleDegreesUnits: 'celsius',
  unit: '°',
};

export const appSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    toggleDayAndNight: (state) => {
      state.toggleDayAndNight =
        state.toggleDayAndNight === 'day' ? 'night' : 'day';
    },
    toggleDegrees: (state) => {
      state.toggleDegreesUnits =
        state.toggleDegreesUnits === 'celsius' ? 'fahrenheit' : 'celsius';
      state.unit = state.toggleDegreesUnits === 'celsius' ? '°' : '℉';
    },
    toggleDayOrNight: (state, action) => {
      state.toggleDayAndNight = action.payload;
    },
  },
});

export const { toggleDayAndNight, toggleDegrees, toggleDayOrNight } =
  appSlice.actions;
export default appSlice.reducer;
