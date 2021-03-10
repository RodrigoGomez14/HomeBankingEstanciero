import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
import Home from './Pages/Home'
import Mesa from './Pages/Mesa'
import {HashRouter,Route,Switch} from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import firebase from 'firebase/app'
const config = {
  apiKey: "AIzaSyAwv-dO2s3nXuJ3FiuU7b-ogpbZY1Q3DWk",
  authDomain: "homebanking-estanciero.firebaseapp.com",
  projectId: "homebanking-estanciero",
  storageBucket: "homebanking-estanciero.appspot.com",
  messagingSenderId: "713648125957",
  appId: "1:713648125957:web:303cf36d830b313f8a846c",
  measurementId: "G-61R17WHFJP"
};
firebase.initializeApp(config)
class App extends Component{
  render(){
    const themeProvider = createMuiTheme({
        palette: {
            white:'#fff',
            primary: {
              light: '#5e92f3',
              main: '#1565c0',
              dark: '#003c8f',
              contrastText: '#fff',
            },
            secondary: {
              light: '#4f5b62',
              main: '#263238',
              dark: '#000a12',
              contrastText: '#000',
            },
            danger:{
              main:'#c62828'
            },
            success:{
              main:'#2e7d32'
            },
            type:'dark'
        },
    });
    return (
      <ThemeProvider theme={themeProvider}>
          <HashRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Mesa' component={Mesa}/>
            </Switch>
          </HashRouter>
      </ThemeProvider>
    );
  }
}

export default App;
