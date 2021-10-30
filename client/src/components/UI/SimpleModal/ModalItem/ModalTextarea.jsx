import React from 'react'
import './ItemStyle.css'
import { TextField } from '@mui/material'

const ModalItem = (props) =>{
    return (
        <p className="TextField" sx={{ fullWidth: `${props.value}%` }}>
            <TextField multiline id={props.id} label={props.label} variant="outlined" fullWidth color="therty"/>
        </p>
    );
}

export default ModalItem