import React, { useEffect, useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";

//MUI
import { Button, Snackbar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MuiAlert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
//icons
import { Add, Check, Edit } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";

//local
import MiniDrawer from "../../components/Navegation/Drawer/MiniDrawer.jsx";
import DataTable from "../../components/UI/DataTable/DataTable.jsx";
import SimpleModal from "../../components/UI/SimpleModal/SimpleModal";
import ModalItemRequired from "../../components/UI/SimpleModal/ModalItem/ModalItemRequired";
import ModalSelect from "../../components/UI/SimpleModal/ModalItem/ModalSelect";
import ModalComboBox from "../../components/UI/SimpleModal/ModalItem/ModalComboBoxSearch";
import DeleteModal from "../../components/UI/DeleteModal/DeleteModal.jsx";
import * as actionTypes from "../../store/actions";

const Publications = (props) => {
  document.title = "Id.uci.cu/Publicaciones";

  const [rows, setRows] = useState([]);
  const [filas, setFilas] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [reload, setReload] = useState(false);

  const [nivel_mes, setNivel_mes] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipo_fuente, setTipo_fuente] = useState("");
  const [fuente, setFuente] = useState("");
  const [indexado, setIndexado] = useState("");
  const [areaidLugar, setAreaidLugar] = useState("");
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
      label: "Nivel MES",
    },
    {
      id: "columna3",
      numeric: true,
      disablePadding: false,
      label: "Título",
    },
    {
      id: "columna4",
      numeric: true,
      disablePadding: false,
      label: "Tipo de fuente",
    },
    {
      id: "columna5",
      numeric: true,
      disablePadding: false,
      label: "Fuente",
    },
    {
      id: "columna6",
      numeric: true,
      disablePadding: false,
      label: "Indexado",
    },
    {
      id: "columna7",
      numeric: true,
      disablePadding: false,
      label: "Área",
    },
    {
      id: "columna8",
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
    Axios.get("http://localhost:3001/publications").then((response) => {
      if (response.data.publications) {
        var aux = [];
        response.data.publications.map((e, i) => {
          aux[i] = JSON.parse(JSON.stringify(e));
        });
        aux.map((e, i) => {
          delete e.idlugar;
        });
        setFilas(aux);
        setReload(false);
        setRows(response.data.publications);
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
    setNivel_mes("");
    setTitulo("");
    setTipo_fuente("");
    setFuente("");
    setIndexado("");
    setAreaidLugar("");
    setUrl("");
  };

  const handleModalOpen = () => {
    if (props.selected.length === 1) {
      setNivel_mes(props.selected[0].nivel_mes);
      setTitulo(props.selected[0].titulo);
      setTipo_fuente(props.selected[0].tipo_fuente);
      setFuente(props.selected[0].fuente);
      setIndexado(props.selected[0].indexado);
      setAreaidLugar(rows.find((e) => e.id_pub === props.selected[0].id_pub));
      setUrl(props.selected[0].url);
      setSelectedId(props.selected[0].id_pub);
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
  //TODO: Add professor to properties of a publicaton
  const handleFilterClick = (name) => {
    // console.log("Dando click en: ", name)
  };
  const AddValidate = () => {
    if (
      nivel_mes !== "" &&
      titulo !== "" &&
      tipo_fuente !== "" &&
      fuente !== "" &&
      indexado !== "" &&
      areaidLugar !== "" &&
      url !== ""
    ) {
      return true;
    }
    return false;
  };
  const handleAddSubmit = () => {
    if (AddValidate) {
      Axios.post("http://localhost:3001/publications/add", {
        nivel_mes: nivel_mes,
        titulo: titulo,
        tipo_fuente: tipo_fuente,
        fuente: fuente,
        indexado: indexado,
        areaidLugar: areaidLugar.idlugar,
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
      Axios.post("http://localhost:3001/publications/edit", {
        id_pub: selectedId,
        nivel_mes: nivel_mes,
        titulo: titulo,
        tipo_fuente: tipo_fuente,
        fuente: fuente,
        indexado: indexado,
        areaidLugar: areaidLugar.idlugar,
        url: url,
      }).then((response) => {
        if (response.data.isOK) {
          // console.log("Everything OK :", response.data.isOK);
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
      return s.id_pub;
    });
    var stringId = JSON.stringify(filterId);
    Axios.post("http://localhost:3001/publications/delete", {
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
        label="Publicaciones Científicas"
        headCells={headCells}
        rows={filas}
        handleFilter={handleFilterClick}
        modalAdd={[
          <SimpleModal
            margin={10}
            label="Añadir nueva Publicación"
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
              label="Nivel MES"
              onChange={(e) => setNivel_mes(e.target.value)}
            />
            <ModalItemRequired
              id="ID"
              label="Título"
              onChange={(e) => setTitulo(e.target.value)}
            />
            <ModalItemRequired
              id="ID"
              label="Tipo de fuente"
              onChange={(e) => setTipo_fuente(e.target.value)}
            />
            <ModalItemRequired
              id="ID"
              label="Fuente"
              onChange={(e) => setFuente(e.target.value)}
            />
            <ModalItemRequired
              id="ID"
              label="Indexado"
              onChange={(e) => setIndexado(e.target.value)}
            />
            <ModalComboBox
              id="idcombo"
              label="Área"
              list={lugares}
              list_label={(option) => option.nombrelugar}
              valueField={areaidLugar}
              onChange={(e, v) => setAreaidLugar(v)}
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
            label="Editar Publicación"
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
              label="Nivel MES"
              onChange={(e) => setNivel_mes(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].nivel_mes : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Título"
              onChange={(e) => setTitulo(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].titulo : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Tipo de fuente"
              onChange={(e) => setTipo_fuente(e.target.value)}
              valueField={
                props.selected.length === 1
                  ? props.selected[0].tipo_fuente
                  : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Fuente"
              onChange={(e) => setFuente(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].fuente : null
              }
            />
            <ModalItemRequired
              id="ID"
              label="Indexado"
              onChange={(e) => setIndexado(e.target.value)}
              valueField={
                props.selected.length === 1 ? props.selected[0].indexado : null
              }
            />
            <ModalComboBox
              id="idcombo"
              label="Área"
              list={lugares}
              list_label={(option) => option.nombrelugar}
              valueField={areaidLugar}
              onChange={(e, v) => setAreaidLugar(v)}
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
