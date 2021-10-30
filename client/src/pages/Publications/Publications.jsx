import React from "react";
import Typography from '@mui/material/Typography';
import MiniDrawer from '../../components/Navegation/Drawer/MiniDrawer.jsx'


function Publications (){
    document.title = "Id.uci.cu/Publicaciones y Eventos";

    return(
        <MiniDrawer>
    <Typography variant='h3'>
        Publicaciones
    </Typography>
    </MiniDrawer>
    );}
export default Publications