import React from "react";
import "./ItemStyle.css";
import { TextField } from "@mui/material";

const ModalItemRequired = (props) => {
    const classes = props.TresColumn?"TextField-3":"TextField-2";
    return (
      <p className={classes} sx={{ fullWidth: `${props.value}%`}}>
        <TextField
          id={props.id}
          color="primary"
          label={props.label}
          fullWidth
          type={props.type ? props.type : null}
          required
          defaultValue = {props.valueField ? props.valueField : null }
          error={props.errorN===2 ? true : false}
          helperText={props.errorN===2 ? props.error : null}
          disabled = {props.disabled}
          onChange={props.onChange}
          // inputProps={props.numeric ? { inputMode: 'numeric', pattern: '[0-9]*' }: { inputMode: 'text' }}
        />
      </p>
    );
};

export default ModalItemRequired;
