import React, {useContext} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

//passwor show
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//iconos
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//server side
import { useEffect,useState } from "react";
import {AuthContext} from '../../context/auth-context'
import Axios from "axios";

function Login(props) {
  document.title = "Id.uci.cu/Iniciar Sesión";

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState({});

  Axios.defaults.withCredentials = true;
  const authContext = useContext(AuthContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      setLoginStatus(response.data);
      if(response.data.auth){
        authContext.login();
        localStorage.setItem("IdTokenJWT", response.data.token)
        history.replace(from);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user.username);
      }
    });
  }, []);

  //funciones
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://uci.com/">
          UCI
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
    };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mt:8, mb:1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="usuario"
            label="Ususario"
            name="usuario"
            autoComplete="usuario"
            autoFocus
            error={loginStatus.msgn===2 ? true : false}
            helperText={loginStatus.msgn===2 ? loginStatus.msgErr : null}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormControl
            variant="outlined"
            margin="normal"
            name="password"
            required
            fullWidth
            autoComplete="current-password"
            error={loginStatus.msgn===1 ? true : false}

          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              aria-describedby="component-error-text"
              label="Password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-error-text">{loginStatus.msgn===1 ? loginStatus.msgErr : null}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Iniciar Sesión
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                No recuerdas tu contraseña
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"¿No tienes cuenta? Create una"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8 }} />
    </Container>
  );
}
export default Login;
