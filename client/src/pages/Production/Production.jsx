import React from 'react'
import Typography from '@mui/material/Typography';
import MiniDrawer from '../../components/Navegation/Drawer/MiniDrawer.jsx'

export const Production = () => {
    document.title = "Id.uci.cu/Producción";

    return (
        <div>
            <MiniDrawer>
            <Typography variant='h3'>
            Production
            </Typography>
            </MiniDrawer>
        </div>
    );
}
export default Production