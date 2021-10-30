import React from "react";
import MiniDrawer from '../../components/Navegation/Drawer/MiniDrawer.jsx'
import Typography from '@mui/material/Typography';

//modales de pablo
import { MenuItem } from '@mui/material';
import SimpleModal from '../../components/UI/SimpleModal/SimpleModal'
import Window from '../../components/UI/Window/Window';
import ModalItem from '../../components/UI/SimpleModal/ModalItem/ModalItem';
import ModalItemRequired from '../../components/UI/SimpleModal/ModalItem/ModalItemRequired';
import ModalTextarea from '../../components/UI/SimpleModal/ModalItem/ModalTextarea';
import ModalSelect from '../../components/UI/SimpleModal/ModalItem/ModalSelect';


function Consumption(){
  document.title = "Id.uci.cu/Consumo";

    return (
      <MiniDrawer>
        <Typography variant="h3">Consumo de agua y energia</Typography>
        <SimpleModal
          margin={3}
          label="insertar ?"
          btnName="Simple Modal"
          btnIcon={false}
        >
          <ModalItem id="ID" label="LABEL01" />
          <ModalItemRequired id="ID" label="LABEL02" />
          <ModalTextarea id="ID" label="LABEL03" />
          <ModalSelect id="ID" label="LABEL04">
            <MenuItem value="1"> valor 1</MenuItem>
            <MenuItem value="2"> valor 2</MenuItem>
            <MenuItem value="3"> valor 3</MenuItem>
            <MenuItem value="4"> valor 4</MenuItem>
            <MenuItem value="5"> valor 5</MenuItem>
          </ModalSelect>
          <ModalItem id="ID" label="LABEL05" />
          <ModalItemRequired id="ID" label="LABEL06" />
          <ModalTextarea id="ID" label="LABEL07" />
          <ModalItem id="ID" label="LABEL08" />
          <ModalItemRequired id="ID" label="LABEL09" />
          <ModalTextarea id="ID" label="LABEL10" />
          <ModalSelect id="ID" label="LABEL11">
            <MenuItem value="1"> valor 1</MenuItem>
            <MenuItem value="2"> valor 2</MenuItem>
            <MenuItem value="3"> valor 3</MenuItem>
            <MenuItem value="4"> valor 4</MenuItem>
            <MenuItem value="5"> valor 5</MenuItem>
          </ModalSelect>
          <ModalItem id="ID" label="LABEL12" />
          <ModalItemRequired id="ID" label="LABEL13" />
          <ModalTextarea id="ID" label="LABEL14" />
          <ModalItemRequired id="ID" label="LABEL15" />
          <ModalTextarea id="ID" label="LABEL16" />
          <ModalItem id="ID" label="LABEL17" />
          <ModalItemRequired id="ID" label="LABEL18" />
          <ModalTextarea id="ID" label="LABEL19" />
          <ModalItemRequired id="ID" label="LABEL20" />
        </SimpleModal>
        {/* MODAL CON SCROLL */}
        <Window label="TITULO DE LA VENTANA">
          <ModalItem id="ID" label="LABEL01" />
          <ModalItemRequired id="ID" label="LABEL02" />
          <ModalTextarea id="ID" label="LABEL03" />
          <ModalSelect id="ID" label="LABEL04">
            <MenuItem value="1"> valor 1</MenuItem>
            <MenuItem value="2"> valor 2</MenuItem>
            <MenuItem value="3"> valor 3</MenuItem>
            <MenuItem value="4"> valor 4</MenuItem>
            <MenuItem value="5"> valor 5</MenuItem>
          </ModalSelect>
          <ModalItem id="ID" label="LABEL05" />
          <ModalItem id="ID" label="LABEL06" />
        </Window>
      </MiniDrawer>
    );}
export default Consumption