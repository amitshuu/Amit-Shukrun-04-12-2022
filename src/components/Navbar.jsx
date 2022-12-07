import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useDarkMode } from '../helpers/customHooks';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import { toggleDayOrNight } from '../store/slices/appSlice';
import { useDispatch } from 'react-redux';

const Navbar = ({ themeToggler }) => {
  const classNameFunc = ({ isActive }) => {
    return isActive ? 'nav-link active' : 'nav-link';
  };
  const dispatch = useDispatch();

  const [theme] = useDarkMode();

  const onToggleHandler = () => {
    themeToggler();
  };

  useEffect(() => {
    if (theme === 'dark') {
      dispatch(toggleDayOrNight('night'));
    } else {
      dispatch(toggleDayOrNight('day'));
    }
  }, [theme, dispatch]);

  return (
    <Wrapper>
      <NavbarLinksContainer>
        <NavLink className={classNameFunc} to='/'>
          Home
        </NavLink>
        <NavLink className={classNameFunc} to='/favorites'>
          Favorites
        </NavLink>
        <ThemeToggleContainer>
          <ToggleButton>
            {theme === 'light' ? (
              <WbSunnyOutlinedIcon onClick={onToggleHandler} className='icon' />
            ) : (
              <NightsStayOutlinedIcon
                onClick={onToggleHandler}
                className='icon'
              />
            )}
          </ToggleButton>
        </ThemeToggleContainer>
      </NavbarLinksContainer>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  padding: 1.5rem 0rem 0.5rem 0rem;
  border-bottom: 1px solid rgb(153, 153, 153, 0.2);
  .nav-link {
    font-weight: 500;
    font-size: 1.25rem;
    letter-spacing: 1px;
    margin-right: 2rem;
    line-height: 1.75rem;
    color: ${(props) => props.theme.text};
  }
  .active {
    border-bottom: 2px solid rgb(59, 130, 246, 1);
  }

  .icon {
    color: ${(props) => props.theme.text};
  }
`;

const NavbarLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const ToggleButton = styled.button`
  border: 1px solid rgb(59, 130, 246, 0.6);
  background-color: transparent;
  justify-content: center;
  align-items: center;
  outline: none;
  display: flex;
  padding: 0.375rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;
