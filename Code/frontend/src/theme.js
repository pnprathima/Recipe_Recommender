import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Start with light mode
    useSystemColorMode: false, // Disable system color mode detection
  },
  colors: {
    // Customize theme colors
    brand: {
      50: '#f0eaff',
      100: '#d7c6ff',
      200: '#b39eff',
      300: '#8f77ff',
      400: '#6b5eff',
      500: '#483dff',
      600: '#3d30cc',
      700: '#2c2299',
      800: '#1b1666',
      900: '#0d0b33',
    },
  },
  styles: {
    global: {
      'html, body': {
        color: 'gray.800', // Set default text color for light mode
        bg: 'white', // Set default background color for light mode
      },
      // Styles for dark mode
      '[data-theme="dark"] html, [data-theme="dark"] body': {
        color: 'white', // Set text color for dark mode
        bg: 'gray.800', // Set background color for dark mode
      },
    },
  },
});

export default theme;
