import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FavoriteLocationDetails from '../components/FavoriteLocationDetails';
import BasicAlerts from '../components/mui/MuiAlert';
import { mobile } from '../helpers/responsiveDesign';

const FavoritePage = () => {
  const { favoriteLocationData } = useSelector(
    (state) => state.favoriteLocationSlice
  );
  return (
    <Wrapper>
      {favoriteLocationData.length < 1 ? (
        <BasicAlerts
          type='warning'
          text={`You havent added places to the list yet`}
        />
      ) : (
        <>
          <Title>Favorites Locations:</Title>
          <FavoriteLocationsContainer>
            {favoriteLocationData?.map((data, index) => {
              return <FavoriteLocationDetails {...data} key={index} />;
            })}
          </FavoriteLocationsContainer>
        </>
      )}
    </Wrapper>
  );
};

export default FavoritePage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`;

const Title = styled.h1`
  margin: 0 auto;
  font-weight: 500;
  font-size: 2.5em;
  letter-spacing: 1px;
  border-bottom: 2px solid rgb(59, 130, 246, 0.6);
  ${mobile({ textAlign: 'center', fontSize: '2.2em' })}
`;

const FavoriteLocationsContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ${mobile({ height: '60vh', overflowY: 'scroll' })}
`;
