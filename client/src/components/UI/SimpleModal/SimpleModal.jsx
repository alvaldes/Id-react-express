import React from "react"
import { connect } from 'react-redux';

//MUI
import {
  Modal,
  Box,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
//ICONS
import { Close } from "@mui/icons-material";
//LOCAL
import "./SimpleModal.css"
import * as actionTypes from '../../../store/actions';

const SimpleModal = (props) => {

    return (
      <div>
        {props.btnIcon ? (
          <Tooltip title={props.tooltip}>
            <IconButton onClick={props.handleModalOpen}>
              {props.btnIcon}
            </IconButton>
          </Tooltip>
        ) : (
          <Button onClick={props.handleModalOpen}>{props.btnName}</Button>
        )}
        <Modal
          className="SimpleModal"
          open={props.isModalOpen}
          onClose={props.handleModalClose}
          sx={{ mt: props.margin, width: props.TresColumn?"90%":"60%"}}
        >
          <Box className="box" bgcolor="therty.main">
            <Typography
              className="titleBox"
              variant="h6"
              sx={{ fontWeight: "bold" }}
            >
              {props.label}
            </Typography>
            <div className="GridItems list scrollbar">{props.children}</div>
            <p className="windowButtons">
              {/* <Button className="button" sx={{ px: 3, mr: 3 }}>
                <Check />
              </Button> */}
              {props.btnSubmit}
              <Button
                className="button"
                sx={{ px: 3 }}
                onClick={props.handleModalClose}
              >
                <Close />
              </Button>
            </p>
          </Box>
        </Modal>
      </div>
    );
}
const mapStateToProps = state => {
  return {
      isModalOpen: state.isModalOpen
  };
};
const mapDispatchToProps = dispatch => {
  return {
      onStoreModalOpen: (bool) => dispatch({type: actionTypes.STORE_Is_Modal_Open, updateModalOpen: bool}),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SimpleModal);
