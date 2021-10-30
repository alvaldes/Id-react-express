const express = require('express');
var router = express.Router();
const{pool}=require("../Database/dbConfig");


router.get("/", (req, res) => {
    pool.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.rowCount > 0) {
            res.json({ users: result.rows });
        }
    });
});
router.post("/add", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    pool.query(
      "INSERT INTO users (name, username, email, password, role) VALUES ($1,$2,$3,$4,$5)",
      [name,username,email, hash, role],
      (err, result) => {
        if (err) {
          console.log(err);
        }else{
          res.json({isOK:true});
        }
      }
    );
  });
});
router.post("/edit", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    pool.query(
      "UPDATE users SET name=$2, username=$3, email=$4, role=$5 WHERE id = $1;",
      [id,name,username,email, role],
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
  const sql = "DELETE FROM users WHERE id IN ("+id.toString()+")";
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