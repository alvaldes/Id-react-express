import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Tooltip, Typography} from "@mui/material";
//iconos
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import * as actionTypes from '../../../store/actions';


function DeleteModal(props) {

  return (
    <div>
      <Tooltip title="Eliminar">
        <IconButton onClick={props.handleModalOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={props.isModal2Open}
        onClose={props.handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
          >
          <WarningAmberIcon />
          {props.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleModalClose}>Cancelar</Button>
          <Button
            onClick={props.handleDeleteClick}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => {
    return {
        isModal2Open: state.isModal2Open
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
        onStoreModal2Open: (bool) => dispatch({type: actionTypes.STORE_Is_Modal2_Open, updateModal2Open: bool}),
    }
  };
  export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);