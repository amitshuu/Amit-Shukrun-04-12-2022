import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  favoriteLocationData: [],
};

export const favoriteLocationSlice = createSlice({
  name: 'favoriteLocationSlice',
  initialState,
  reducers: {
    addFavoriteLocation: (state, action) => {
      state.favoriteLocationData.push(action.payload);
    },
    deleteFavoriteLoctaion: (state, action) => {
      state.favoriteLocationData = state.favoriteLocationData.filter((item) => {
        return item.currentLocationKey !== action.payload;
      });
    },
  },
});

export const { addFavoriteLocation, deleteFavoriteLoctaion } =
  favoriteLocationSlice.actions;
export default favoriteLocationSlice.reducer;
