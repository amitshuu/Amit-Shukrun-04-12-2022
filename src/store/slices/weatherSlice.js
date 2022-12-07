import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCityKey = createAsyncThunk('state/cityKey', async (cords) => {
  return await axios
    .get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=${cords}&q=details=true`
    )
    .then((res) => res.data);
});

export const getCurrentWeather = createAsyncThunk(
  'state/currentWeather',
  async (cityKey) => {
    return await axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => res.data.DailyForecasts);
  }
);

const initialState = {
  currentLocationKey: '215854',
  currentLocationName: 'Tel Aviv',
  currentLocationData: null,
  status: '',
  cityByCordsStatus: '',
  cords: null,
};

export const weatherSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setCurrentLocaionKey: (state, action) => {
      state.currentLocationKey = action.payload;
    },
    setCurrentLocationName: (state, action) => {
      state.currentLocationName = action.payload;
    },
    setCords: (state, action) => {
      state.cords = action.payload;
    },
  },
  extraReducers: {
    [getCityKey.pending]: (state) => {
      state.cityByCordsStatus = 'loading';
    },
    [getCityKey.fulfilled]: (state, action) => {
      state.currentLocationKey = action.payload.Key;
      state.currentLocationName = action.payload.LocalizedName;
      state.cityByCordsStatus = 'success';
    },
    [getCityKey.rejected]: (state, action) => {
      state.cityByCordsStatus = 'failed';
    },

    [getCurrentWeather.pending]: (state) => {
      state.status = 'loading';
    },
    [getCurrentWeather.fulfilled]: (state, action) => {
      state.currentLocationData = action.payload;
      state.status = 'success';
    },
    [getCurrentWeather.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { setCurrentLocaionKey, setCurrentLocationName, setCords } =
  weatherSlice.actions;
export default weatherSlice.reducer;
