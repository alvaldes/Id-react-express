import React from 'react'
import {Fragment} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Axios from "axios";

//imports MUI
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//imports icons

//local
import * as actionTypes from '../../../store/actions';


const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    Axios.defaults.withCredentials = true;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} seleccionado
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Lugares Geoespaciales
          </Typography>
        )}
        {props.children}
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mr: 1 }}
        />
        {numSelected === 0 ? (
          <Fragment>
            {props.modalAdd}
            {props.modalFilter}
          </Fragment>
        ) : null}
        {numSelected >= 1 ? (
          <Fragment>
            {numSelected === 1 ? (
              props.modalEdit
            ) : null}
            {props.btnDelete}
          </Fragment>
        ) : null}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const mapStateToProps = state => {
    return {
        selected: state.tablaSelected
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
        onStoreSelected: (array) => dispatch({type: actionTypes.STORE_TABLE_SELECTED, updateSelected: array}),
    }
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTableToolbar);