import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './components/store'
import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline, createTheme } from '@mui/material'

export default App;
const theme = createTheme({
  typography: {
    fontSize: 17,
  },
  
  palette: {
    primary: {
      light: "#AEDBFE",
      main: "#7CC6FE",
      dark: '#35A3FD',
      contrastText:'#8F611B'
    },
    secondary: {
      light: "#E5E3F3",
      main: "#BBB6DF",
      dark: "#887FC7",
      contrastText:'#8F611B'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0
        },
        html: {
          height: "100%",
          width: "100%"
        },
        body: {
          height: "100%",
          width: "100%"
        },
        "#root": {
          height: "100%",
          width: "100%",
          // display: 'flex',
          // flexDirection:'row',
          // overflow:'auto',
          // minWidth:'auto',
          // minHeight:'auto'
        },
        '.app': {
        }
      }
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
      </ThemeProvider>
  </React.StrictMode>
);

// if jsx
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store = {store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// )