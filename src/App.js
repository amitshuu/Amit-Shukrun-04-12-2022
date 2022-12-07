import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import { darkTheme, GlobalStyles, lightTheme } from './components/Theme';
import { useDarkMode } from './helpers/customHooks';
import FavoritePage from './pages/FavoritePage';
import HomePage from './pages/HomePage';
const App = () => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Navbar themeToggler={themeToggler} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<h2>Error</h2>} />
          <Route path='/favorites' element={<FavoritePage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
