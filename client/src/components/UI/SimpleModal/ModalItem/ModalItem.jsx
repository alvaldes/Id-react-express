import React from 'react'
import './ItemStyle.css'
import { TextField } from '@mui/material'

const ModalItem = (props) => {
    return (
      <p className="TextField">
        <TextField
          id={props.id}
          label={props.label}
          variant="outlined"
          fullWidth
          color="therty"
          type={props.type ? props.type : null}
        />
      </p>
    );
}

export default ModalItem;