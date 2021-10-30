import React, {Fragment, useContext, useEffect} from 'react'
import {Fab } from '@mui/material'
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

//iconos
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import {AuthContext} from '../../../context/auth-context'
import Axios from "axios";

Axios.defaults.withCredentials = true;
const BtnAccount = () => {
    const authContext = useContext(AuthContext);
    const matches = useMediaQuery('(min-width:900px)');
    const location = useLocation();
    const history = useHistory();
    const logout = () =>{
        Axios.get("http://localhost:3001/logout", {
          header: {},
        }).then((response)=>{
          if(!response.data.auth){
            <Redirect to='/catalogue'/>

            authContext.logout();
            if(location.pathname === "/"){
              authContext.logout();
              console.log(location.pathname);
              // history.replace("/catalogue");
              <Redirect to='/catalogue'/>
          }
            }
        });
      };
    // useEffect(()=>{
    //   Axios.get('http://localhost:3001/isAuth',{
    //     headers:{
    //       "x-access-toxen": localStorage.getItem("IDTokenJWT"),
    //     },
    //   }).then((response)=>{
    //     if(response.data.authJWT)
    //     authContext.login();
    //   });
    // },[authContext]);
    return (
      <Fragment>
        {authContext.isAuth ? (
          <Fab
            variant="extended"
            size="small"
            color="therty"
            sx={
              location.pathname === "/"
                ? {px: 4, py: 1, ml: 3, mt: 3}
                : {px: 4, py: 1, ml: 3, mt: 1}
            }
            onClick={logout}
          >
            {matches ? "Cerrar Sesión" : ""}
            <LogoutRoundedIcon sx={{ ...(matches && { ml: 1 }) }} />
          </Fab>
        ) : (
          <Fab
            variant="extended"
            size="small"
            color="therty"
            sx={
              location.pathname === "/"
                ? {px: 4, py: 1, ml: 3, mt: 3}
                : {px: 4, py: 1, ml: 3, mt: 0}
            }            component={Link}
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          >
            {matches ? "Iniciar Sesión" : ""}
            <LoginRoundedIcon sx={{ ...(matches && { ml: 1 }) }} />
          </Fab>
        )}
      </Fragment>
    );
}

export default BtnAccount
