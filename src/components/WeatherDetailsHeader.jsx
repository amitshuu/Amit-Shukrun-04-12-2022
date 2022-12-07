import React from 'react';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { mobile } from '../helpers/responsiveDesign';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavoriteLoctaion,
  addFavoriteLocation,
} from '../store/slices/favoriteLocationSlice';

const WeatherDetailsHeader = ({ WeatherIcon, WeatherDegree }) => {
  const { currentLocationName, currentLocationData, currentLocationKey } =
    useSelector((state) => state.weatherReducer);

  const { favoriteLocationData } = useSelector(
    (state) => state.favoriteLocationSlice
  );

  const dispatch = useDispatch();

  const iconFunc = WeatherIcon < 10 ? '0' + WeatherIcon : WeatherIcon;

  const isFavorited = favoriteLocationData?.filter(
    (f) => f.currentLocationKey === currentLocationKey
  );

  const onClickHandler = () => {
    if (isFavorited.length > 0) {
      dispatch(deleteFavoriteLoctaion(currentLocationKey));
    } else {
      dispatch(
        addFavoriteLocation({
          ...currentLocationData[0],
          currentLocationName,
          currentLocationKey,
        })
      );
    }
  };

  return (
    <Wrapper>
      <CityDetails>
        <CityImage
          src={`https://developer.accuweather.com/sites/default/files/${iconFunc}-s.png`}
        />
        <CityInfoContainer>
          <CityName>{currentLocationName}</CityName>
          <CityDegrees>{WeatherDegree}</CityDegrees>
        </CityInfoContainer>
      </CityDetails>
      <FavoriteButtonContainer>
        <FavoriteButton onClick={onClickHandler} type='button'>
          {isFavorited.length > 0
            ? 'DELETE FROM FAVORITES'
            : 'ADD TO FAVORITES'}
        </FavoriteButton>
        {isFavorited.length > 0 ? (
          <DeleteIcon className='icon' onClick={onClickHandler} />
        ) : (
          <FavoriteBorderIcon className='icon' onClick={onClickHandler} />
        )}
      </FavoriteButtonContainer>
    </Wrapper>
  );
};

export default WeatherDetailsHeader;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  ${mobile({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  })}
  .icon {
    position: absolute;
    margin-left: 1rem;
    font-size: 20px;
    color: rgb(237, 73, 86);
    ${mobile({ position: 'relative' })}
  }
`;

const CityDetails = styled.div`
  display: flex;
  ${mobile({ width: '100%', justifyContent: 'center' })}
`;

const CityInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mobile({ flexDirection: 'row' })}
`;
const CityImage = styled.img``;
const CityName = styled.p`
  font-size: 22px;
  ${mobile({ marginRight: '15px' })}
`;

const CityDegrees = styled.p`
  font-size: 18px;
  margin: 0;
`;

const FavoriteButton = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.75rem 3rem;
  font-size: 0.8rem;
  border-radius: 0.375rem;
  color: ${(props) => props.theme.text};
  text-align: center;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const FavoriteButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  text-align: center;
  align-items: center;
  ${mobile({
    display: 'flex',
    justifyContent: 'center',
  })}
`;
