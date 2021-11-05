const express = require('express');
var router = express.Router();
const{pool}=require("../Database/dbConfig");

router.get("/", (req, res) => {
    pool.query("SELECT * FROM events", (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.rowCount > 0) {
            res.json({ events: result.rows });
        }
    });
});
router.post("/add", (req, res) => {
  const titulo = req.body.titulo;
  const fecha_inicio = req.body.fecha_inicio;
  const fecha_fin = req.body.fecha_fin;
  const id_lugar = req.body.id_lugar;
  const url = req.body.url;
pool.query(
    "INSERT INTO events (titulo, fecha_inicio, fecha_fin, id_lugar, url) VALUES ($1,$2,$3,$4,$5)",
    [titulo,fecha_inicio,fecha_fin, id_lugar, url],
    (err, result) => {
    if (err) {
        console.log(err);
    }else{
        res.json({isOK:true});
    }
    }
    );
});

router.post("/edit", (req, res) => {
    const id_ev = req.body.id_ev;
    const titulo = req.body.titulo;
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_fin = req.body.fecha_fin;
    const id_lugar = req.body.id_lugar;
    const url = req.body.url;
    pool.query(
      "UPDATE events SET titulo=$2, fecha_inicio=$3, fecha_fin=$4, id_lugar=$5, url=$6 WHERE id_ev = $1;",
      [id_ev,titulo,fecha_inicio,fecha_fin, id_lugar, url],
      (err, result) => {
      if (err) {
        console.log(err);
      }else{
        res.json({isOK:true});
      }
      }
    );
});
router.post("/delete", (req, res) => {
  const id= JSON.parse(req.body.id);
  const sql = "DELETE FROM events WHERE id_ev IN ("+id.toString()+")";
  pool.query(sql,
    (err, result) => {
    if (err) {
      console.log(err);
    }else{
      res.json({isOK:true});
    }
    }
  );
});


module.exports = router;