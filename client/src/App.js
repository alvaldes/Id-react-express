import React, {Component} from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Homepage from './pages/Homepage/Homepage.jsx'
import Catalogue from './pages/Catalogue/Catalogue'
import Consumption from './pages/Consumption/Consumption'
import Courses from './pages/Courses/Courses'
import Places from './pages/Places/Places'
import Production from './pages/Production/Production'
import Professors from './pages/Professors/Professors'
import Publications from './pages/Publications/Publications'
import AboutUS from './pages/AboutUS/Aboutus'
import GetData from './pages/GetData/GetData'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotFound from './pages/NotFound/NotFound.jsx'

import {ThemeProvider} from '@mui/material/styles'
import theme from './themeConfig'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import Axios from "axios";
import {AuthContext} from './context/auth-context' 


class App extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        this.context.login();
        // console.log(this.context.isAuth);
      } 
    });
 
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/id.uci.cu/">
          <Switch>
            <Route exact path="/">
              <Homepage height={this.state.height} />
            </Route>
            <Route exact path="/catalogue" component={Catalogue} />
            <Route exact path="/about_us" component={AboutUS} />
            <Route exact path="/getdata" component={GetData} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* protected route */}
            <PrivateRoute exact path="/consumption"><Consumption/></PrivateRoute>
            <PrivateRoute exact path="/places"><Places/></PrivateRoute>
            <PrivateRoute exact path="/courses" ><Courses/></PrivateRoute>
            <PrivateRoute exact path="/production" ><Production/></PrivateRoute>
            <PrivateRoute exact path="/professors" ><Professors/></PrivateRoute>
            <PrivateRoute exact path="/publications" ><Publications/></PrivateRoute>
            <Route>
              <NotFound height={this.state.height} />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
export default App;
