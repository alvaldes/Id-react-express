import React, { Fragment, useEffect, useState } from "react";
import MiniDrawer from "../../components/Navegation/Drawer/MiniDrawer.jsx";
import DataTable from "../../components/UI/DataTable/DataTable.jsx";
import Axios from "axios";
import { connect } from "react-redux";

//MUI
import { Button, Snackbar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MuiAlert from "@mui/material/Alert";

//icons
import { Add, Check, Edit } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";

//local
import SimpleModal from "../../components/UI/SimpleModal/SimpleModal";
import ModalItemRequired from "../../components/UI/SimpleModal/ModalItem/ModalItemRequired";
import DeleteModal from "../../components/UI/DeleteModal/DeleteModal.jsx";
import * as actionTypes from "../../store/actions";

const Places = (props) => {
  document.title = "Id.uci.cu/Lugares";

  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [reload, setReload] = useState(false);

  const [nombreLugar, setnombreLugar] = useState("");
  const [tipoLugar, settipoLugar] = useState("");
  const [descripcionLugar, setdescripcionLugar] = useState("");
  const [latitudLugar, setlatitudLugar] = useState(0);
  const [longitudLugar, setLongitudLugar] = useState(0);
  const [imagenLugar, setimagenLugar] = useState(0);

  const [snackOpen, setsnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={19} ref={ref} variant="filled" {...props} />;
  });
  const headCells = [
    {
      id: "columna1",
      numeric: false,
      disablePadding: true,
      label: "Identificador",
    },
    {
      id: "columna2",
      numeric: true,
      disablePadding: false,
      label: "Nombre",
    },
    {
      id: "columna3",
      numeric: true,
      disablePadding: false,
      label: "Tipo",
    },
    {
      id: "columna4",
      numeric: true,
      disablePadding: false,
      label: "Descripción",
    },
    {
      id: "columna5",
      numeric: true,
      disablePadding: false,
      label: "Latitud",
    },
    {
      id: "columna6",
      numeric: true,
      disablePadding: false,
      label: "Longitud",
    },
    {
      id: "columna7",
      numeric: true,
      disablePadding: false,
      label: "Imagen",
    },
  ];

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    // props.onStoreSelected([]);
    Axios.get("http://localhost:3001/places").then((response) => {
      if (response.data.lugar) {
        setRows(response.data.lugar);
        setReload(false);
      }
    });
  }, [reload]);

  //Modal Add y Edit Open-Close
  const handleModalClose = () => {
    props.onStoreSelected([]);
    props.onStoreModalOpen(false);
    setSelectedId([]);
    setnombreLugar("");
    settipoLugar("");
    setdescripcionLugar("");
    setlatitudLugar(0);
    setLongitudLugar(0);
    setimagenLugar(0);
  };

  const handleModalOpen = () => {
    if (props.selected.length === 1) {
      setnombreLugar(props.selected[0].nombrelugar);
      settipoLugar(props.selected[0].tipolugar);
      setdescripcionLugar(props.selected[0].descripcionugar);
      setlatitudLugar(props.selected[0].latitud);
      setLongitudLugar(props.selected[0].longitud);
      setimagenLugar(props.selected[0].imagenlugar);
      setSelectedId(props.selected[0].idlugar);
      console.log(props.selected[0].idlugar);
    }
    props.onStoreModalOpen(true);
  };
  //Modal Filter y Delete Open-Close
  const handleModal2Close = () => {
    props.onStoreModal2Open(false);
  };

  const handleModal2Open = () => {
    props.onStoreModal2Open(true);
  };
  //handle click
  const handleFilterClick = (name) => {
    // console.log("Dando click en: ", name)
  };
  const AddValidate = () => {
    if (
      nombreLugar !== "" &&
      tipoLugar !== "" &&
      descripcionLugar !== "" &&
      latitudLugar !== "" &&
      longitudLugar !== "" &&
      imagenLugar !== ""
    ) {
      return true;
    }
    return false;
  };
  const handleAddSubmit = () => {
    if (AddValidate) {
      Axios.post("http://localhost:3001/places/add", {
        nombreLugar: nombreLugar,
        tipoLugar: tipoLugar,
        descripcionLugar: descripcionLugar,
        latitudLugar: latitudLugar,
        longitudLugar: longitudLugar,
        imagenLugar: imagenLugar,
      }).then((response) => {
        if (response.data.isOK) {
          props.onStoreModalOpen(false);
          setReload(true);
          setsnackOpen(true);
          setSnackMsg("Añadido correctamente");
        }
      });
    }
  };
  const handleEditSubmit = () => {
    if (AddValidate) {
      Axios.post("http://localhost:3001/places/upd", {
        id: selectedId,
        nombreLugar: nombreLugar,
        tipoLugar: tipoLugar,
        descripcionLugar: descripcionLugar,
        latitudLugar: latitudLugar,
        longitudLugar: longitudLugar,
        imagenLugar: imagenLugar,
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
    var filterId = selected.map((s, i) => {
      return s.idlugar;
    });
    var stringId = JSON.stringify(filterId);
    Axios.post("http://localhost:3001/places/del", {
      id: stringId,
    }).then((response) => {
      if (response.data.isOK) {
        const cantS = props.selected.length;
        props.onStoreSelected([]);
        props.onStoreModal2Open(false);
        setReload(true);
        setsnackOpen(true);
        setSnackMsg("Eliminado " + cantS + " elemento(s) correctamente");
      }
    });
  };
  return (
    <MiniDrawer>
      <DataTable
        label="Lugares Geoespaciales"
        headCells={headCells}
        rows={rows}
        handleFilter={handleFilterClick}
        modalAdd={[
          <SimpleModal
            margin={10}
            label="Añadir nuevo lugar"
            btnName="Modal btnNuevo"
            btnIcon={[<Add />]}
            tooltip="Nuevo"
            handleModalClose={handleModalClose}
            handleModalOpen={handleModalOpen}
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
              TresColumn={false}
              onChange={(e) => setnombreLugar(e.target.value)}
            />
            <ModalItemRequired
              id="ID"
              label="Tipo"
              TresColumn={false}
              onChange={(e) => settipoLugar(e.target.value)}
            />
            <ModalItemRequired
              id="ID"
              label="Descripcion"
              TresColumn={false}
              onChange={(e) => setdescripcionLugar(e.target.value)}
            />
            <ModalItemRequired
              id="ID"
              label="Latitud"
              TresColumn={false}
              onChange={(e) => setlatitudLugar(parseFloat(e.target.value))}
            />
            <ModalItemRequired
              id="ID"
              label="Longitud"
              TresColumn={false}
              onChange={(e) => setLongitudLugar(parseFloat(e.target.value))}
            />
            <ModalItemRequired
              id="ID"
              label="Imagen"
              TresColumn={false}
              onChange={(e) => setimagenLugar(e.target.value)}
            />
          </SimpleModal>,
        ]}
        modalFilter={[
          <Tooltip title="Filtro">
            <IconButton onClick={() => handleFilterClick("FILTER")}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>,
        ]}
        modalEdit={[
          <SimpleModal
            margin={10}
            label="Editar Usuario"
            btnName="Modal btnEditar"
            btnIcon={[<Edit />]}
            tooltip="Editar"
            handleModalClose={handleModalClose}
            handleModalOpen={handleModalOpen}
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
              onChange={(e) => setnombreLugar(e.target.value)}
              valueField={
                props.selected.length === 1
                  ? props.selected[0].nombrelugar
                  : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Tipo"
              onChange={(e) => settipoLugar(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].tipolugar : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Descripcion"
              onChange={(e) => setdescripcionLugar(e.target.value)}
              valueField={
                props.selected.length === 1
                  ? props.selected[0].descripcionlugar
                  : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Latitud"
              onChange={(e) => setlatitudLugar(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].latitud : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Longitud"
              onChange={(e) => setLongitudLugar(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].longitud : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Imagen"
              onChange={(e) => setimagenLugar(e.target.value)}
              valueField={
                props.selected.length === 1
                  ? props.selected[0].imagenlugar
                  : null
              }
            />
          </SimpleModal>,
        ]}
        btnDelete={[
          <DeleteModal
            title="Alerta"
            description={
              "Esta seguro que desea eliminar " +
              props.selected.length +
              " elemento(s)."
            }
            handleModalClose={handleModal2Close}
            handleModalOpen={handleModal2Open}
            handleDeleteClick={() => handleDeleteClick(props.selected)}
          />,
        ]}
      />
      {/* Alertas */}
      <Snackbar
        open={
          snackOpen
            ? setTimeout(() => {
                setsnackOpen(false);
              }, 3000)
            : false
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </MiniDrawer>
  );
};
const mapStateToProps = (state) => {
  return {
    isModalOpen: state.isModalOpen,
    isModal2Open: state.isModal2Open,
    selected: state.tablaSelected,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onStoreModalOpen: (bool) =>
      dispatch({
        type: actionTypes.STORE_Is_Modal_Open,
        updateModalOpen: bool,
      }),
    onStoreModal2Open: (bool) =>
      dispatch({
        type: actionTypes.STORE_Is_Modal2_Open,
        updateModal2Open: bool,
      }),
    onStoreSelected: (array) =>
      dispatch({
        type: actionTypes.STORE_TABLE_SELECTED,
        updateSelected: array,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Places);
