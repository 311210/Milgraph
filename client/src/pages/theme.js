import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontSize: 18, // Zmiana rozmiaru czcionki dla całej strony
    },
    palette: {
        mode: 'dark',
      },
  });
export default theme;