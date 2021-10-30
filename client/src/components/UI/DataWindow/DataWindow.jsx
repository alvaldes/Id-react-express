import React from 'react'
import './DataWindow.css'

import { Modal, Box, Button, Divider } from '@mui/material'
import { Download, Add, Close } from '@mui/icons-material';
import { Typography } from '@mui/material'

/*import ModalItem from './ModalItem/ModalItem';
import ModalTitle from './ModalItem/ModalTitle';
import ModalItemRequired from './ModalItem/ModalItemRequired';
import ModalTextarea from './ModalItem/ModalTextarea';*/

const DataWindow = (props) => {

    const handleModalOpen = () =>
        setOpen(true);
    ;

    const handleModalClose = () =>
        setOpen(false);
    ;

    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={handleModalOpen} size="small" color="secondary">
          Más
        </Button>
        <div>
          <Modal className="Window" open={open} onFocusVisible={false} onClose={handleModalClose}>
            <Box className="Box" color="primary.main">
              <p className="WindowTitle">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="primary.contrastText"
                  sx={{ marginLeft: "15px" }}
                >
                  {props.title}
                </Typography>
                <Button
                  className="buttonClose"
                  marginBottom="0.35em"
                  alignItems= "start"
                  justifyContent="end"
                  startIcon={<Close />}
                  onClick={handleModalClose}
                />
              </p>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ m:"15px 15px" }}
              >
                {props.label}
              </Typography>
              <p className="download">
                <Button
                  className="ButtonExport"
                  variant="outlined"
                  startIcon={<Download />}
                  onFocusVisible={true}
                >
                  TURTLE
                </Button>
                <Button
                  className="ButtonExport"
                  variant="outlined"
                  startIcon={<Download />}
                >
                  N3
                </Button>
                <Button
                  className="ButtonExport"
                  variant="outlined"
                  startIcon={<Download />}
                >
                  CSV
                </Button>
                <Button
                  className="ButtonExport"
                  variant="outlined"
                  startIcon={<Download />}
                >
                  JSON-LD
                </Button>
                <Button
                  className="ButtonExport"
                  variant="outlined"
                  startIcon={<Download />}
                >
                  EndPoint
                </Button>
              </p>
            </Box>
          </Modal>
        </div>
      </div>
    );
}

export default DataWindow;