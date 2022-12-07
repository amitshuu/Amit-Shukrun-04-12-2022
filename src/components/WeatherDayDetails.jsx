import React from 'react';
import styled from 'styled-components';
import { mobile } from '../helpers/responsiveDesign';
import { temperatureConverter } from '../helpers/utils';

const WeatherDayDetails = ({
  Day,
  Date: date,
  Night,
  Temperature,
  toggleDayAndNight,
  toggleDegreesUnits,
  unit,
}) => {
  const { Icon } = toggleDayAndNight === 'day' ? Day : Night;
  const iconFunc = Icon < 10 ? '0' + Icon : Icon;
  const { Maximum, Minimum } = Temperature;

  const WeatherTempFunction = `${temperatureConverter(
    toggleDayAndNight === 'day' ? Maximum.Value : Minimum.Value,
    toggleDegreesUnits
  )}${unit}`;

  const forecastDay = new Date(date).toString().substring(0, 3);

  return (
    <Wrapper>
      <Container
        className={
          toggleDayAndNight === 'day' ? 'lightBackground' : 'darkBackground'
        }
      >
        <WeatherDay
          style={
            toggleDayAndNight === 'day'
              ? { color: 'black' }
              : { color: 'white' }
          }
        >
          {forecastDay}
        </WeatherDay>
        <WeatherTemperature
          style={
            toggleDayAndNight === 'day'
              ? { color: 'black' }
              : { color: 'white' }
          }
        >
          {WeatherTempFunction}
        </WeatherTemperature>
        <WeatherIcon
          src={`https://developer.accuweather.com/sites/default/files/${iconFunc}-s.png`}
        />
      </Container>
    </Wrapper>
  );
};

export default WeatherDayDetails;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  .lightBackground {
    background: linear-gradient(
      179.6deg,
      rgb(0, 197, 233) -5%,
      rgb(196, 246, 255) 65.3%
    );
  }
  .darkBackground {
    background-image: linear-gradient(to top, #1a3961 5%, #678aa5 100%);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 0.375rem;
  ${mobile({
    width: '85%',
  })}
`;

const WeatherDay = styled.p`
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const WeatherTemperature = styled.p`
  margin-bottom: 5px;
`;
const WeatherIcon = styled.img``;
