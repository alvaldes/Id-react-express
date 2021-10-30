import React from 'react';
import './Navbar.css';

import {AppBar, Toolbar,Box } from '@mui/material';

//iconos

//local imports
import Logo from "../../Logo/Logo";
import NavigationItems from '../NavigationItems/NavigationItems';
import BtnAccount from '../../Auth/BtnAccount/BtnAccount';


const Navbar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className="Navbar"
          position="static"
          color="transparent"
          sx={{ boxShadow: 0 }}
        >
          <Toolbar sx={{
              display:'flex',
              justifyContent: 'space-between',
              overflow: 'hidden',
              flexWrap: 'wrap',
          }}>
            <Box>
              <Logo class="logoNavbar" />
            </Box>
            <Box
              mr={2}
              mt={3}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <NavigationItems />
            </Box>
            <BtnAccount/>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Navbar
