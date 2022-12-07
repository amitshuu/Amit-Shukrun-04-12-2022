import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { temperatureConverter } from '../helpers/utils';
import {
  setCurrentLocaionKey,
  setCurrentLocationName,
} from '../store/slices/weatherSlice';

const FavoriteLocationDetails = ({
  currentLocationName,
  Day: { Icon, IconPhrase },
  Temperature: { Minimum, Maximum },
  currentLocationKey,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toggleDegreesUnits, unit, toggleDayAndNight } = useSelector(
    (state) => state.appSlice
  );

  const WeatherDegreeFunction = `${temperatureConverter(
    toggleDayAndNight === 'day' ? Maximum?.Value : Minimum?.Value,
    toggleDegreesUnits
  )}${unit}`;

  const iconFunc = Icon < 10 ? '0' + Icon : Icon;

  const onClickHandler = () => {
    dispatch(setCurrentLocaionKey(currentLocationKey));
    dispatch(setCurrentLocationName(currentLocationName));
    navigate('/');
  };

  return (
    <Wrapper>
      <WeatherContainer onClick={onClickHandler}>
        <LocationName>{currentLocationName}</LocationName>
        <LocationTemp>{WeatherDegreeFunction}</LocationTemp>
        <WeatherIcon
          src={`https://developer.accuweather.com/sites/default/files/${iconFunc}-s.png`}
        />
        <WeatherDescription>{IconPhrase}</WeatherDescription>
      </WeatherContainer>
    </Wrapper>
  );
};

export default FavoriteLocationDetails;

const Wrapper = styled.div`
  display: flex;
`;
const WeatherContainer = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  max-width: 125px;
  margin: 1rem;
  cursor: pointer;
  padding: 1rem;
  max-height: 200px;
`;
const LocationName = styled.p`
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 1.1em;
`;
const LocationTemp = styled.p`
  margin-bottom: 0.5rem;
`;
const WeatherIcon = styled.img`
  margin-bottom: 1rem;
`;
const WeatherDescription = styled.p`
  text-align: center;
`;
