import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007CC2',
    },
    secondary: {
      main: '#29166F',
    },
    background:{
        default: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
