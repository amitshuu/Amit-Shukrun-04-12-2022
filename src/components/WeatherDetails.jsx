import React, { useEffect } from 'react';
import styled from 'styled-components';
import WeatherDetailsHeader from './WeatherDetailsHeader';
import WeatherDayDetails from './WeatherDayDetails';
import Loader from './mui/MuiLoader';
import { temperatureConverter } from '../helpers/utils';
import CustomizedSwitches from './mui/MuiSwitchToggle';
import { mobile } from '../helpers/responsiveDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getCityKey, getCurrentWeather } from '../store/slices/weatherSlice';
import BasicAlerts from './mui/MuiAlert';
import { capitalize } from '@mui/material';

let initalLoad = true;

const WeatherDetails = () => {
  const dispatch = useDispatch();
  const {
    currentLocationKey,
    currentLocationData,
    status,
    cords,
    cityByCordsStatus,
  } = useSelector((state) => state.weatherReducer);
  const { toggleDayAndNight, unit, toggleDegreesUnits } = useSelector(
    (state) => state.appSlice
  );

  const { Maximum, Minimum } = currentLocationData?.[0].Temperature ?? {};

  const { Icon } =
    currentLocationData?.[0][capitalize(toggleDayAndNight)] ?? {};

  const dayCondition =
    currentLocationData?.[0][capitalize(toggleDayAndNight)].IconPhrase;

  const weatherDegreesCalc = `${temperatureConverter(
    toggleDayAndNight === 'day' ? Maximum?.Value : Minimum?.Value,
    toggleDegreesUnits
  )}${unit}`;

  useEffect(() => {
    if (initalLoad) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          getCityKey(position.coords.latitude + ',' + position.coords.longitude)
        );
      });
      initalLoad = false;
    }
  }, [cords, dispatch]);

  useEffect(() => {
    dispatch(getCurrentWeather(currentLocationKey));
  }, [currentLocationKey, dispatch]);

  const isLoading =
    status === 'loading' || cityByCordsStatus === 'loading' ? true : false;

  const isError =
    status === 'failed' || cityByCordsStatus === 'failed' ? true : false;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <BasicAlerts
          type='error'
          text='Something went wrong. please try again later.'
        />
      ) : (
        <>
          <WeatherDetailsHeader
            WeatherDegree={weatherDegreesCalc}
            WeatherIcon={Icon}
          />
          <MainContent>
            <DayCondition>{dayCondition}</DayCondition>

            <CustomizedSwitches />
          </MainContent>
          <WeatherDaysContainer>
            {currentLocationData?.map((days, index) => {
              return (
                <WeatherDayDetails
                  toggleDayAndNight={toggleDayAndNight}
                  toggleDegreesUnits={toggleDegreesUnits}
                  unit={unit}
                  {...days}
                  key={index}
                />
              );
            })}
          </WeatherDaysContainer>
        </>
      )}
    </Wrapper>
  );
};

export default WeatherDetails;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  border: 2px solid ${(props) => props.theme.border};
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  padding: 20px;
`;

const DayCondition = styled.h1`
  font-weight: 500;
  margin-bottom: 10px;
  letter-spacing: 1px;
  ${mobile({ fontWeight: '600', fontSize: '1.5em', textAlign: 'center' })}
`;

const WeatherDaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  ${mobile({
    overflowX: 'scroll',
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar': { width: '12px', height: '5px', marginTop: '1rem' },
  })}
`;
