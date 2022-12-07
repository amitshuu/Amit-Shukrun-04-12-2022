import styled from 'styled-components';
import WeatherDetails from '../components/WeatherDetails';
import SearchLocationInput from '../components/SearchLocationInput';

const HomePage = () => {
  return (
    <Wrapper>
      <SearchLocationInput />
      <WeatherDetailsContainer>
        <WeatherDetails />
      </WeatherDetailsContainer>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  margin-top: 2rem;
  .input_active {
    border: 1px solid rgb(59, 130, 246, 0.6) !important;
    outline: none;
  }
`;

const WeatherDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
