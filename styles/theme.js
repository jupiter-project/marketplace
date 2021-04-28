
import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: 'CRC-BOLD, CRC-LIGHT',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [{
          fontFamily: 'CRC-BOLD',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `
            local('CRC-BOLD'),
            url('/assets/fonts/CRC-BOLD.woff') format('woff')`
        },
        {
          fontFamily: 'CRC-LIGHT',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `
            local('CRC-LIGHT'),
            url('/assets/fonts/CRC-LIGHT.woff') format('woff')`
        }],
      }
    },
    MuiCard: {
      root: {
        borderRadius: 10,
        boxShadow: '0 2px 12px 0 #bdbdbd',
      }
    },
  },
  palette: {
    primary: {
      light: '#4791db',
      main: '#2B9938',
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
      primary: '#4e4e4f',
      secondary: '#a2a1b2'
    },
  },
  custom: {
    palette: {
      grey: '#e6e6e6',
      darkGrey: '#616166',
      orange: '#d36738',
      white: '#ffffff',
      pink: '#d808dd',
      red: '#8d161e',
      yellow: '#ffb418',
      green: '#2B9938',
      darkGreen: '#073920',
      lightGreen: '#5dc1a3',
      blue: '#4595e6',
      lightBlue: '#d9e8ff',
      black: '#000000',
      border: '#999999'
    },
    layout: {
      topAppBarHeight: 60,
      maxDesktopWidth: 1110,
      maxMarketPlaceWidth: 1366
    },
  }
}));

export default theme;
