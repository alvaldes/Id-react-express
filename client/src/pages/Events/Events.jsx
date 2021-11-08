import React, { useEffect, useState } from "react";
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
import MiniDrawer from "../../components/Navegation/Drawer/MiniDrawer.jsx";
import DataTable from "../../components/UI/DataTable/DataTable.jsx";
import SimpleModal from "../../components/UI/SimpleModal/SimpleModal";
import ModalItemRequired from "../../components/UI/SimpleModal/ModalItem/ModalItemRequired";
import ModalComboBox from "../../components/UI/SimpleModal/ModalItem/ModalComboBoxSearch";
import DeleteModal from "../../components/UI/DeleteModal/DeleteModal.jsx";
import * as actionTypes from "../../store/actions";
import ModalDataTime from "../../components/UI/SimpleModal/ModalItem/ModalDataTime";

const Publications = (props) => {
  document.title = "Id.uci.cu/Eventos";

  const [rows, setRows] = useState([]);
  const [filas, setFilas] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [reload, setReload] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState(new Date()); // "2020-11-19T05:23:56.000Z"
  const [fecha_fin, setFecha_fin] = useState(new Date());
  const [lugar, setLugar] = useState("");
  const [url, setUrl] = useState("");

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
      label: "ID",
    },
    {
      id: "columna2",
      numeric: true,
      disablePadding: false,
      label: "Título",
    },
    {
      id: "columna3",
      numeric: true,
      disablePadding: false,
      label: "Fecha de Apertura",
    },
    {
      id: "columna4",
      numeric: true,
      disablePadding: false,
      label: "Fecha de Cierre",
    },
    {
      id: "columna5",
      numeric: true,
      disablePadding: false,
      label: "Lugar",
    },
    {
      id: "columna6",
      numeric: true,
      disablePadding: false,
      label: "URL",
    },
  ];

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    // props.onStoreSelected([]);
    cargarDatos();
  }, [reload]);

  const cargarDatos = () => {
    Axios.get("http://localhost:3001/events").then((response) => {
      if (response.data.events) {
        var aux = [];
        response.data.events.map((e, i) => {
          aux[i] = JSON.parse(JSON.stringify(e));
        });
        aux.map((e, i) => {
          e.fecha_inicio = new Date(e.fecha_inicio).toDateString();
          e.fecha_fin = new Date(e.fecha_fin).toDateString();
          delete e.idlugar;
        });
        setFilas(aux);
        setReload(false);
        setRows(response.data.events);
      }
    });
    Axios.get("http://localhost:3001/places").then((response) => {
      if (response.data.lugar) {
        setReload(false);
        setLugares(response.data.lugar);
      }
    });
  };
  //Modal Add y Edit Open-Close
  const handleModalClose = () => {
    props.onStoreSelected([]);
    props.onStoreModalOpen(false);
    setSelectedId([]);
    setTitulo("");
    // setFecha_inicio("12-12-2018 12:00:00.00");
    setFecha_fin("");
    setLugar("");
    setUrl("");
  };

  const handleModalOpen = () => {
    setFecha_inicio(new Date());
    setFecha_fin(new Date());
    if (props.selected.length === 1) {
      setTitulo(props.selected[0].titulo);
      setFecha_inicio(new Date(props.selected[0].fecha_inicio));
      setFecha_fin(new Date(props.selected[0].fecha_fin));
      setLugar(rows.find((e) => e.id_ev === props.selected[0].id_ev));
      setUrl(props.selected[0].url);
      setSelectedId(props.selected[0].id_ev);
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
  // handle click
  //TODO: Add professor to properties of a event
  const handleFilterClick = (name) => {};
  const AddValidate = () => {
    if (
      titulo !== "" &&
      fecha_inicio !== "" &&
      fecha_fin !== "" &&
      lugar !== "" &&
      url !== ""
    ) {
      return true;
    }
    return false;
  };
  const handleAddSubmit = () => {
    if (AddValidate) {
      Axios.post("http://localhost:3001/events/add", {
        titulo: titulo,
        fecha_inicio: fecha_inicio.toISOString(),
        fecha_fin: fecha_fin.toISOString(),
        idlugar: lugar.idlugar,
        url: url,
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
      Axios.post("http://localhost:3001/events/edit", {
        id_ev: selectedId,
        titulo: titulo,
        fecha_inicio: fecha_inicio.toISOString(),
        fecha_fin: fecha_fin.toISOString(),
        idlugar: lugar.idlugar,
        url: url,
      }).then((response) => {
        if (response.data.isOK) {
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
      return s.id_ev;
    });
    var stringId = JSON.stringify(filterId);
    Axios.post("http://localhost:3001/events/delete", {
      id: stringId,
    }).then((response) => {
      if (response.data.isOK) {
        const cantS = props.selected.length;
        props.onStoreSelected([]);
        props.onStoreModal2Open(false);
        setReload(true);
        // window.location.reload(false);
        setsnackOpen(true);
        setSnackMsg("Eliminado " + cantS + " elemento(s) correctamente");
      }
    });
  };
  return (
    <MiniDrawer>
      <DataTable
        label="Eventos"
        headCells={headCells}
        rows={filas}
        handleFilter={handleFilterClick}
        modalAdd={[
          <SimpleModal
            margin={10}
            label="Añadir nuevo Evento"
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
              label="Título"
              onChange={(e) => setTitulo(e.target.value)}
            />
            <ModalDataTime
              label="Fecha de Apertura"
              value={fecha_inicio}
              onChange={(date) => setFecha_inicio(date)}
            />
            <ModalComboBox
              id="idcombo"
              label="Lugar"
              list={lugares}
              list_label={(option) => option.nombrelugar}
              valueField={lugar}
              onChange={(e, v) => setLugar(v)}
            />
            <ModalDataTime
              label="Fecha de Cierre"
              value={fecha_fin}
              onChange={(date) => setFecha_fin(date)}
            />
            <ModalItemRequired
              id="ID"
              label="URL"
              onChange={(e) => setUrl(e.target.value)}
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
            label="Editar Evento"
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
              label="Título"
              onChange={(e) => setTitulo(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].titulo : null
              }
            />
            <ModalDataTime
              label="Fecha de Apertura"
              value={fecha_inicio}
              onChange={(date) => setFecha_inicio(date)}
            />
            <ModalComboBox
              id="idcombo"
              label="Lugar"
              list={lugares}
              list_label={(option) => option.nombrelugar}
              valueField={lugar}
              onChange={(e, v) => setLugar(v)}
            />
            <ModalDataTime
              label="Fecha de Cierre"
              value={fecha_fin}
              onChange={(date) => setFecha_fin(date)}
            />
            <ModalItemRequired
              id="ID"
              label="URL"
              onChange={(e) => setUrl(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].url : null
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
export default connect(mapStateToProps, mapDispatchToProps)(Publications);
