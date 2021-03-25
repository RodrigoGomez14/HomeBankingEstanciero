import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
import Home from './Pages/Home'
import Mesa from './Pages/Mesa'
import SignInPage from './Pages/SignInPage'
import {HashRouter,Route,Switch} from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import firebase from 'firebase/app'
import reducer from './Reducers'
import PantallaDeCarga from './Pages/PantallaDeCarga'

let store 
let data

const config = {
  apiKey: "AIzaSyAwv-dO2s3nXuJ3FiuU7b-ogpbZY1Q3DWk",
  authDomain: "homebanking-estanciero.firebaseapp.com",
  databaseURL: "https://homebanking-estanciero-default-rtdb.firebaseio.com",
  projectId: "homebanking-estanciero",
  storageBucket: "homebanking-estanciero.appspot.com",
  messagingSenderId: "713648125957",
  appId: "1:713648125957:web:506b483c95179b208a846c",
  measurementId: "G-6DMYDEEFHR"
};
firebase.initializeApp(config)
class App extends Component{
  state={
    loading:true,
    theme:localStorage.getItem('theme')?localStorage.getItem('theme'):'light'
  }
  async componentDidMount(){
    firebase.auth().onAuthStateChanged(async user=>{
      if(user){
        const databaseRef = await firebase.database().ref().child(user.uid)
        databaseRef.on('value', snapshot=>{
          data= snapshot.val()
          store=createStore(reducer, {user:user,data:data})
          this.setState({store,user:user,loading:false})
        })
      }
      else{
        this.setState({user:null,loading:false})
      }
    })
    const theme = localStorage.getItem('theme')
    if(!theme){
        localStorage.setItem('theme','light')
    }
  }
  
  render(){
    const themeProvider = createMuiTheme({
        palette: {
            white:'#fff',
            primary: {
              light: '#48a999',
              main: '#00796b',
              dark: '#004c40',
              contrastText: '#fff',
            },
            secondary: {
              light: '#ff5c8d',
              main: '#d81b60',
              dark: '#a00037',
              contrastText: '#fff',
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
    if(this.state.loading){
      return(
        <div className="App justify-content-center">
          <ThemeProvider theme={themeProvider}>
              <PantallaDeCarga loading={this.state.loading}/>
          </ThemeProvider>
        </div>
      )
    }
    else{
      if(this.state.user){
        return (
          <ThemeProvider theme={themeProvider}>
              <Provider store={this.state.store}>
                <HashRouter>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/Mesa' component={Mesa}/>
                  </Switch>
                </HashRouter>
              </Provider>
            </ThemeProvider>
        )
      }
      /*
        <Route exact path='/' component={SignInPage}/>
      */ 
      else{
        return (
          <ThemeProvider theme={themeProvider}>
            <HashRouter>
              <Switch>
                <Route exact path='/' component={SignInPage}/>
              </Switch>
            </HashRouter>
          </ThemeProvider>
        )
      }
    }
  }
}

export default App;
