import React from 'react'
import './ItemStyle.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ModalSelect = (props) =>{
    const classes = props.TresColumn?"TextField-3":"TextField-2";
    const defaultProps = {
        options: props.list,
        getOptionLabel: props.list_label,
      };
    return (
        <p className={classes} sx={{ fullWidth: `${props.value}%` }}>
            <Autocomplete
            {...defaultProps}
            disablePortal
            disableListWrap
            required
            id={props.id}
            value={props.valueField ? props.valueField : null }
            onChange={props.onChange}
            error={props.errorN===2 ? true : false}
            helperText={props.errorN===2 ? props.error : null}
            renderInput={(params) => <TextField {...params} label={props.label} />}
            />
        </p>
    );
}

export default ModalSelect
