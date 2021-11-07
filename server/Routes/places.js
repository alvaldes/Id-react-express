const express = require("express");
var router = express.Router();
const { pool } = require("../Database/dbConfig");

router.get("/", (req, res) => {
  pool.query("SELECT * FROM lugar", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.rowCount > 0) {
      res.json({ lugar: result.rows });
    }
  });
});
router.post("/add", (req, res) => {
  const nombreLugar = req.body.nombreLugar;
  const tipoLugar = req.body.tipoLugar;
  const descripcionLugar = req.body.descripcionLugar;
  const latitudLugar = req.body.latitudLugar;
  const longitudLugar = req.body.longitudLugar;
  const imagenLugar = req.body.imagenLugar;
  pool.query(
    "INSERT INTO lugar (nombrelugar, tipolugar,descripcionlugar,latitud,longitud,imagenlugar)VALUES($1,$2,$3,$4,$5,$6)",
    [
      nombreLugar,
      tipoLugar,
      descripcionLugar,
      latitudLugar,
      longitudLugar,
      imagenLugar,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ isOK: true });
      }
    }
  );
});
router.post("/del", (req, res) => {
  const id = JSON.parse(req.body.id);
  const sql = "DELETE FROM lugar WHERE idlugar IN (" + id.toString() + ")";
  pool.query(sql, (err, result) => {
    if (err) {
      res.log(err);
    } else {
      res.json({ isOK: true });
    }
  });
});
router.post("/upd", (req, res) => {
  const id = req.body.id;
  const nombreLugar = req.body.nombreLugar;
  const tipoLugar = req.body.tipoLugar;
  const descripcionLugar = req.body.descripcionLugar;
  const latitudLugar = req.body.latitudLugar;
  const longitudLugar = req.body.longitudLugar;
  const imagenLugar = req.body.imagenLugar;
  pool.query(
    "UPDATE lugar SET nombrelugar=$2, tipolugar=$3, descripcionlugar=$4, latitud=$5, longitud=$6, imagenlugar=$7 WHERE idlugar=$1",
    [
      id,
      nombreLugar,
      tipoLugar,
      descripcionLugar,
      latitudLugar,
      longitudLugar,
      imagenLugar,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ isOK: true });
      }
    }
  );
});

module.exports = router;
