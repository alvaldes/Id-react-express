import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import {Link} from 'react-router-dom';
import DataWindow from '../../UI/DataWindow/DataWindow';
import {AuthContext} from '../../../context/auth-context'

const DataCard = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <Card sx={{ maxWidth: 345 }} elevation={6}>
        <CardMedia
          component="img"
          height="140"
          image= {props.picture}
          alt= {props.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{color:'primary'}}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      {authContext.isAuth ?(
        <Button size="small" color="secondary" component={Link} to={props.ruta}>
            Gestionar
          </Button>
      ) :(null)}
        {/* aqui se pone su modal*/}
        <DataWindow label={props.label} title={props.title}/>
      </CardActions>
    </Card>
  );
}
export default DataCard;