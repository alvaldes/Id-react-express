import React from "react";
import Typography from '@mui/material/Typography';
import MiniDrawer from '../../components/Navegation/Drawer/MiniDrawer.jsx'

function Professors (){
    document.title = "Id.uci.cu/Profesores";

    return(
        <MiniDrawer>
    <Typography variant='h3'>
    Professors
    </Typography>
    </MiniDrawer>
    );
}
export default Professors