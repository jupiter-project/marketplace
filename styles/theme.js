
import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: 'Shentox',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [{
          fontFamily: 'Shentox',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `
            local('Shentox'),
            url('/assets/fonts/Shentox.ttf') format('truetype')`
        }]
      }
    },
    MuiCard: {
      root: {
        borderRadius: 20,
        boxShadow: '0 2px 12px 0 #bdbdbd',
      }
    },
  },
  palette: {
    primary: {
      light: '#4791db',
      main: '#009044',
      dark: '#ecebed',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#555e6c',
      main: '#0066ff',
      dark: '#1e2532',
      contrastText: '#ffffff'
    },
    danger: {
      light: '#c944dd',
      main: '#eb196e',
      dark: '#b20000',
      contrastText: '#ffffff'
    },
    background: {
      default: '#ffffff',
      primary: '#ecebed',
      secondary: '#343a40'
    },
    text: {
      primary: '#262433',
      secondary: '#a2a1b2'
    },
  },
  custom: {
    palette: {
      grey: '#ecebed',
      darkGrey: '#616166',
      orange: '#d36738',
      white: '#ffffff',
      pink: '#d808dd',
      red: '#f2556f',
      yellow: '#ffb418',
      green: '#41d98d',
      darkGreen: '#073920',
      lightGreen: '#5dc1a3',
      blue: '#4595e6',
      lightBlue: '#d9e8ff',
      black: '#000000',
      border: '#f1f0f2'
    },
    layout: {
      topAppBarHeight: 80,
      maxDesktopWidth: 1110,
      maxMarketPlaceWidth: 1640
    },
  }
}));

export default theme;
