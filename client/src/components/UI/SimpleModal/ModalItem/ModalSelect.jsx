import React from 'react'
import './ItemStyle.css'
import { FormControl, InputLabel, Select } from '@mui/material'

const ModalSelect = (props) =>{
    const classes = props.TresColumn?"TextField-3":"TextField-2";
    return (
        <p className={classes} sx={{ fullWidth: `${props.value}%` }}>
            <FormControl fullWidth>
                <InputLabel id={props.id}>{props.label}</InputLabel>
                <Select 
                id={props.id} 
                label={props.label}
                required
                value = {props.valueField ? props.valueField : null }
                error={props.errorN===2 ? true : false}
                helperText={props.errorN===2 ? props.error : null}
                onChange={props.onChange}
                >
                    {props.children}
                </Select>
            </FormControl>
        </p>
    );
}

export default ModalSelect
