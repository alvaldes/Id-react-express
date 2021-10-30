import React from 'react';
import "./Window.css"
import { Modal, Box, Button, Typography, List } from '@mui/material'
import { Check, Close } from '@mui/icons-material';

const Window = (props) => {

    const handleModalOpen = () =>
        setOpen(true);
    ;

    const handleModalClose = () =>
        setOpen(false);
    ;

    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Button onClick={handleModalOpen}>Open Window Here!</Button>
            <Modal className= "Window" open={open}>
                <Box className= "box" bgcolor="primary">
                    <Typography className= "titleBox">
                        {props.label}
                    </Typography>
                    <div className= "list scrollbar">
                        {props.children}
                    </div>
                    <p className= "windowButtons">
                        <Button className= "button" sx={{ px: 3, mr: 3 }}>
                            <Check />
                        </Button>
                        <Button className= "button" sx={{ px: 3 }} onClick={handleModalClose} bgcolor="primary">
                            <Close />
                        </Button>
                    </p>
                </Box>
            </Modal>
        </div >
    );
}

export default Window;