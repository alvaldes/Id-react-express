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


module.exports = router;