import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  border: 'rgb(59, 130, 246, 0.5)',
  text: 'black',
  inputColor: '#fff',
};

export const darkTheme = {
  body: '#121212',
  text: '#fff',
  border: 'rgb(255, 255, 255, 0.5)',
  inputColor: 'rgb(255, 255, 255, 0.8)',
};

export const GlobalStyles = createGlobalStyle`  
    body{
    background:${(props) => props.theme.body} ;
    height:100vh ;
    } 
      h1,p,a, link{
    color: ${(props) => props.theme.text}
  }

`;
