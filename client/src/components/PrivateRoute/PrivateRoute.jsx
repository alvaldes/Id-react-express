import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect,useState } from "react";
import {AuthContext} from '../../context/auth-context'
import Axios from "axios";

function PrivateRoute({ children, ...rest }) {
    const authContext = useContext(AuthContext);
    const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
      Axios.get('http://localhost:3001/isAuth',{
        headers:{
          "x-access-toxen": localStorage.getItem("IDTokenJWT"),
        },
      }).then((response)=>{
        if(response.data.authJWT)
        authContext.login();
        setLoginStatus(true);
        // console.log("authContext" + authContext.isAuth);
        // console.log("loginStatus" + loginStatus);
        }
      );
    }, [authContext]);
    return (
      loginStatus ? (
        <Route {...rest} render={({ location }) =>(
            authContext.isAuth ? (
            // <props.component/>
            children
            ) : (
              <Redirect
                to={{
                  pathname: "/catalogue",
                  state: { from: location }
                }}
              />
            )
          )
          }
        />
      ) :(null)
    )
}
export default PrivateRoute
