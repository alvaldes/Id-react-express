const express = require('express');
var router = express.Router();
const{pool}=require("../Database/dbConfig");

router.get("/", (req, res) => {
    pool.query("SELECT A.id_pub, A.nivel_mes, A.titulo, A.tipo_fuente, A.fuente, A.indexado, B.idlugar, B.nombrelugar, A.url FROM publications as A, lugar as B WHERE A.areaidlugar=B.idlugar",
    (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.rowCount > 0) {
            res.json({ publications: result.rows });
        }
    });
});
router.post("/add", (req, res) => {
  const nivel_mes = req.body.nivel_mes;
  const titulo = req.body.titulo;
  const tipo_fuente = req.body.tipo_fuente;
  const fuente = req.body.fuente;
  const indexado = req.body.indexado;
  const areaidLugar = req.body.areaidLugar;
  const url = req.body.url;
pool.query(
    "INSERT INTO publications (nivel_mes, titulo, tipo_fuente, fuente, indexado, areaidLugar, url) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [nivel_mes, titulo, tipo_fuente, fuente, indexado, areaidLugar, url],
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
    const id_pub = req.body.id_pub;
    const nivel_mes = req.body.nivel_mes;
    const titulo = req.body.titulo;
    const tipo_fuente = req.body.tipo_fuente;
    const fuente = req.body.fuente;
    const indexado = req.body.indexado;
    const areaidLugar = req.body.areaidLugar;
    const url = req.body.url;
    pool.query(
      "UPDATE publications SET nivel_mes=$2, titulo=$3, tipo_fuente=$4, fuente=$5,"
      + "indexado=$6, areaidlugar=$7, url=$8 WHERE id_pub = $1;",
      [id_pub, nivel_mes, titulo, tipo_fuente, fuente, indexado, areaidLugar, url],
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
  const sql = "DELETE FROM publications WHERE id_pub IN ("+id.toString()+")";
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