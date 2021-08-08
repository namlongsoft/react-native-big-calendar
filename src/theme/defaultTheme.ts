import { ThemeInterface } from './ThemeInterface'

export const defaultTheme: ThemeInterface = {
  isRTL: false,
  palette: {
    primary: {
      main: '#000',
      contrastText: '#3075ea',
    },
    // nowIndicator: 'red',
    nowIndicator: '#3a465b',
    gray: {
      // 50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      // 400: '#bdbdbd',
      500: '#9e9e9e',
      // 600: '#757575',
      // 700: '#616161',
      800: '#424242',
      // 900: '#212121',
    },
  },
  eventCellOverlappings: [
    { main: '#E26245', contrastText: '#fff' }, // orange
    { main: '#4AC001', contrastText: '#fff' }, // green
    { main: '#5934C7', contrastText: '#fff' }, // purple
  ],
  typography: {
    xs: {
      fontSize: 10,
    },
    sm: {
      fontSize: 12,
    },
    lg: {
      fontSize: 16,
    },
    xl: {
      fontSize: 19,
      fontWeight: '700',
    },,
  },
}
