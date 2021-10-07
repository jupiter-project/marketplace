
import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

const MuiCssBaseline = {
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
}

const layout = {
  topAppBarHeight: 60,
  maxDesktopWidth: 1110,
  maxMarketPlaceWidth: 1366
}

const lightTheme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: 'CRC-BOLD, CRC-LIGHT',
  },
  overrides: {
    MuiCssBaseline,
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
      orange: '#d36738',
      white: '#ffffff',
      red: '#8d161e',
      green: '#2B9938',
      darkGreen: '#073920',
      blue: '#4595e6',
      black: '#000000',
      border: '#999999'
    },
    layout,
  }
}));

const darkTheme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: 'CRC-BOLD, CRC-LIGHT',
  },
  overrides: {
    MuiCssBaseline,
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
      default: '#4e4e4f',
      primary: '#a2a1b2',
      secondary: '#343a40'
    },
    text: {
      primary: '#ffffff',
      secondary: '#ecebed',
    },
  },
  custom: {
    palette: {
      grey: '#e6e6e6',
      orange: '#d36738',
      white: '#ffffff',
      red: '#8d161e',
      green: '#2B9938',
      darkGreen: '#073920',
      blue: '#4595e6',
      black: '#000000',
      border: '#999999'
    },
    layout,
  }
}));

export { lightTheme, darkTheme };
