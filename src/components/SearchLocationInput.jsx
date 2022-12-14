import React, { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useDebounce } from '../helpers/customHooks';
import {
  setCurrentLocaionKey,
  setCurrentLocationName,
} from '../store/slices/weatherSlice';
import axios from 'axios';

const SearchLocationInput = () => {
  const dispatch = useDispatch();
  const [searchQueryValue, setSearchQueryValue] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const debounceValue = useDebounce(searchQueryValue, 600);
  const [data, setData] = useState(null);

  const onClickHandler = (cityKey, cityName) => {
    dispatch(setCurrentLocaionKey(cityKey));
    dispatch(setCurrentLocationName(cityName));
    setSearchQueryValue('');
    setData(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${debounceValue}`
      );
      setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (searchQueryValue) {
      fetchData();
    }
    setData(null);
    // eslint-disable-next-line
  }, [debounceValue]);

  return (
    <Wrapper>
      <InputContainer>
        <SearchOutlinedIcon
          style={{
            position: 'absolute',
            marginRight: '10px',
          }}
        />
        <Input
          className={isInputActive ? 'input_active' : ''}
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
          value={searchQueryValue}
          onChange={(e) => setSearchQueryValue(e.target.value)}
          type='text'
          lang='en'
        />
        {data && searchQueryValue && (
          <ResultContainer>
            {data.length ? (
              data?.map((location) => {
                return (
                  <Result
                    key={location.Key}
                    onClick={() =>
                      onClickHandler(location.Key, location.LocalizedName)
                    }
                  >
                    {location.LocalizedName}
                  </Result>
                );
              })
            ) : (
              <LocationNotFoundContainer>
                <LocationNotFound>
                  Location with the name "{debounceValue}" was not found.
                </LocationNotFound>
              </LocationNotFoundContainer>
            )}
          </ResultContainer>
        )}
      </InputContainer>
    </Wrapper>
  );
};

export default SearchLocationInput;

const Wrapper = styled.div`
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  font-size: 1em;
  border: 1px solid rgb(179, 179, 179, 1);
  color: rgb(25, 25, 25, 1);
  background-color: ${(props) => props.theme.inputColor};
  padding: 0.75rem 0.75rem;
  &:focus {
    border: 1px solid red;
  }
`;

const ResultContainer = styled.div`
  position: absolute;
  height: 20vh;
  background-color: ${(props) => props.theme.inputColor};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 100%;
  top: 50px;
  margin-top: 0.3rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.375rem;

  overflow: hidden;
  overflow-y: scroll;
  z-index: 2;
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const Result = styled.p`
  margin-bottom: 5px;
  margin-left: 10px;
  padding: 5px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  color: black;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: rgb(59, 130, 246, 0.1);
  }
`;

const LocationNotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const LocationNotFound = styled.p``;
