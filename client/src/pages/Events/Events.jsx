import React, {useEffect, useState} from 'react'
import Axios from "axios";
import { connect } from 'react-redux';

//MUI
import {Button, Snackbar} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';

//icons
import { Add, Check, Edit } from "@mui/icons-material";
import FilterListIcon from '@mui/icons-material/FilterList';

//local
import MiniDrawer from '../../components/Navegation/Drawer/MiniDrawer.jsx'
import DataTable from '../../components/UI/DataTable/DataTable.jsx';
import SimpleModal from '../../components/UI/SimpleModal/SimpleModal'
import ModalItemRequired from '../../components/UI/SimpleModal/ModalItem/ModalItemRequired';
import DeleteModal from '../../components/UI/DeleteModal/DeleteModal.jsx';
import * as actionTypes from '../../store/actions';

const Events = (props) => {
  document.title = "Id.uci.cu/Eventos";

  const [rows, setRows] = useState([]);
  const [name, setName] = useState('');
  const [selectedId, setSelectedId] = useState("");
  const [reload, setReload] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [snackOpen, setsnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={19} ref={ref} variant="filled" {...props} />;
  });
  const headCells = [
    {
      id: 'columna1',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'columna2',
      numeric: true,
      disablePadding: false,
      label: 'Título',
    },
    {
      id: 'columna3',
      numeric: true,
      disablePadding: false,
      label: 'Fecha de Apertura',
    },
    {
      id: 'columna4',
      numeric: true,
      disablePadding: false,
      label: 'Fecha de Cierre',
    },
    {
      id: 'columna5',
      numeric: true,
      disablePadding: false,
      label: 'Lugar',
    },
    {
      id: 'columna6',
      numeric: true,
      disablePadding: false,
      label: 'URL',
    },
  ];

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    // props.onStoreSelected([]);
    Axios.get("http://localhost:3001/events").then((response) => {
      if(response.data.events){
        setRows(response.data.events);
        setReload(false);
      }
    });
  }, [reload]);
  
  //Modal Add y Edit Open-Close
  const handleModalClose = () =>{
    props.onStoreSelected([]);
    props.onStoreModalOpen(false);
    setSelectedId([]);
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("");
  }
  
  const handleModalOpen = () => {
    if(props.selected.length===1){
      setName( props.selected[0].name);
      setUsername(props.selected[0].username);
      setEmail( props.selected[0].email);
      setPassword(props.selected[0].password);
      setRole(props.selected[0].role);
      setSelectedId(props.selected[0].id);
    }
    props.onStoreModalOpen(true);
  }
  //Modal Filter y Delete Open-Close
  const handleModal2Close = () =>{
    props.onStoreModal2Open(false);
  }
  
  const handleModal2Open = () => {
    props.onStoreModal2Open(true);
  }
  //handle click
  const handleFilterClick = (name) => {
    console.log("Dando click en: ", name)
  };
  const AddValidate = () =>{
    if (
      name !== "" &&
      username !== "" &&
      email !== "" &&
      password !== "" &&
      role !== ""
    ) {
      return true;
    }
    return false;
  }
  const handleAddSubmit = () => {
    if(AddValidate){
      Axios.post("http://localhost:3001/users/add", {
      name: name,
      username: username,
      email: email,
      password: password,
      role: role,
      }).then((response) => {
      if(response.data.isOK){
        props.onStoreModalOpen(false);
        setReload(true);
        setsnackOpen(true);
        setSnackMsg("Añadido correctamente");
      }
    });
    }
  };
  const handleEditSubmit = () => {
    if(AddValidate){
      Axios.post("http://localhost:3001/users/edit", {
        id: selectedId,
        name: name,
        username: username,
        email: email,
        role: role,
      }).then((response) => {
        if (response.data.isOK) {
          console.log("Everything OK :", response.data.isOK);
          props.onStoreSelected([]);
          props.onStoreModalOpen(false);
          setReload(true);
          setsnackOpen(true);
          setSnackMsg("Editado correctamente");
        }
      });
    }
  };
  const handleDeleteClick = (selected) => {
    var filterId = selected.map((s,i) => {
      return s.id;
    });
    var stringId = JSON.stringify(filterId);
    Axios.post("http://localhost:3001/users/delete", {
        id: stringId,
      }).then((response) => {
        if (response.data.isOK) {
          const cantS = props.selected.length;
          props.onStoreSelected([]);
          props.onStoreModal2Open(false);
          setReload(true);
          setsnackOpen(true);
          setSnackMsg("Eliminado "+ cantS +" elemento(s) correctamente");        }
      });
  };
  return (
      <MiniDrawer>
        <DataTable
          label = "Usuarios"
          headCells={headCells}
          rows={rows}
          handleFilter={handleFilterClick}
          modalAdd={[
            <SimpleModal
              margin={10}
              label="Añadir nuevo Usuario"
              btnName="Modal btnNuevo"
              btnIcon={[<Add />]}
              tooltip="Nuevo"
              handleModalClose= {handleModalClose}
              handleModalOpen= {handleModalOpen}
              btnSubmit={[
                <Button
                  className="button"
                  sx={{ px: 3, mr: 3 }}
                  onClick={handleAddSubmit}
                >
                  <Check />
                </Button>,
              ]}
            >
              <ModalItemRequired
                id="ID"
                label="Nombre"
                TresColumn = {false}
                onChange={(e) => setName(e.target.value)}
              />
              <ModalItemRequired
                id="ID"
                label="Usuario"
                TresColumn = {false}
                onChange={(e) => setUsername(e.target.value)}
              />
              <ModalItemRequired
                id="ID"
                label="Correo"
                TresColumn = {false}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ModalItemRequired
                id="ID"
                label="Contraseña"
                TresColumn = {false}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ModalItemRequired
                id="ID"
                label="Role"
                TresColumn = {false}
                onChange={(e) => setRole(e.target.value)}
              />
            </SimpleModal>,
          ]}
          modalFilter={[
            <Tooltip title="Filtro">
              <IconButton onClick={()=> handleFilterClick("FILTER")}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          ]}
          modalEdit={[
            <SimpleModal
                margin={10}
                label="Editar Usuario"
                btnName="Modal btnEditar"
                btnIcon={[<Edit />]}
                tooltip="Editar"
                handleModalClose= {handleModalClose}
                handleModalOpen= {handleModalOpen}
                btnSubmit={[
                  <Button
                    className="button"
                    sx={{ px: 3, mr: 3 }}
                    onClick={handleEditSubmit}
                  >
                    <Check />
                  </Button>,
                ]}
              >
                <ModalItemRequired
                  id="ID"
                  label="Nombre"
                  onChange={(e) => setName(e.target.value)}
                  valueField={props.selected.length===1? props.selected[0].name : null}
                />
                <ModalItemRequired
                  id="ID"
                  label="Usuario"
                  onChange={(e) => setUsername(e.target.value)}
                  valueField={props.selected.length===1? props.selected[0].username : null}
                />
                <ModalItemRequired
                  id="ID"
                  label="Correo"
                  onChange={(e) => setEmail(e.target.value)}
                  valueField={props.selected.length===1? props.selected[0].email : null}
                />
                <ModalItemRequired
                  id="ID"
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                  valueField={props.selected.length===1? props.selected[0].role : null}
                />
              </SimpleModal>
          ]}
          btnDelete={[
            <DeleteModal
              title="Alerta"
              description={"Esta seguro que desea eliminar "+props.selected.length+" elemento(s)."}
              handleModalClose= {handleModal2Close}
              handleModalOpen= {handleModal2Open}
              handleDeleteClick = {()=>handleDeleteClick(props.selected)}
            />
          ]}
        />
        {/* Alertas */}
        <Snackbar
          open={snackOpen?(setTimeout(() => {
            setsnackOpen(false)
          }, 3000)
          ):(false)}
          anchorOrigin={{vertical:'bottom', horizontal:'right'}}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            {snackMsg}
          </Alert>
        </Snackbar>
      </MiniDrawer>
  );
}
const mapStateToProps = state => {
  return {
      isModalOpen: state.isModalOpen,
      isModal2Open: state.isModal2Open,
      selected: state.tablaSelected
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onStoreModalOpen: (bool) => dispatch({type: actionTypes.STORE_Is_Modal_Open, updateModalOpen: bool}),
    onStoreModal2Open: (bool) => dispatch({type: actionTypes.STORE_Is_Modal2_Open, updateModal2Open: bool}),
    onStoreSelected: (array) => dispatch({type: actionTypes.STORE_TABLE_SELECTED, updateSelected: array}),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Events);
