const express = require('express');
require("dotenv").config();
const cors = require("cors");
const{pool}=require("./Database/dbConfig");
const session= require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const bcrypt= require("bcrypt");
const saltRounds = 10;

var userRouter = require('./Routes/users')
var placesRouter = require('./Routes/places')
var publicationsRouter = require('./Routes/publications')
var coursesRouter = require('./Routes/courses')
var productionsRouter = require('./Routes/productions')
var consumptonsRouter = require('./Routes/consumptions')
var profesorsRouter = require('./Routes/profesors')

//Midelweare
const app = express();
const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
);
app.use(cookieParser());  
app.use(session({
    key: "userId",
    secret: process.env.SESSION_SECERT,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
}));

//ROUTES
app.use("/users",userRouter);
app.use("/places",placesRouter);
app.use("/publications",publicationsRouter);
app.use("/courses",coursesRouter);
app.use("/productions",productionsRouter);
app.use("/consumptions",consumptonsRouter);
app.use("/profesors",profesorsRouter);


//AUTH
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = 'user';
    const email = req.body.email +'@email.com';
    const role = 'Administrador';
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      pool.query(
        "INSERT INTO users (name, username, email, password, role) VALUES ($1,$2,$3,$4,$5)",
        [name,username,email, hash, role],
        (err, result) => {
          console.log(err);
        }
      );
    });
});
const verifyJWT = (req, res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        res.send('El token no existe');
    } else{
        jwt.verify(token, process.env.JWT_SECERT, (err, decoded)=>{
            if(err){
                res.json({auth: false, message: "faild to authenticate"});
            } else {
                req.userid = decoded.id;
                next();
            }
        });
    }
};
app.get('/isAuth', verifyJWT, (req, res)=>{
    res.json({authJWT:true})
});
app.get("/logout", (req, res) => {
    res.clearCookie('userId');
    res.json({auth:false});
});
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});
app.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.rowCount > 0) {
        bcrypt.compare(password, result.rows[0].password, (error, response) => {
          if (response) {
            const user = {
              id: result.rows[0].id,
              name: result.rows[0].name,
              username: result.rows[0].username,
              email: result.rows[0].email,
              role: result.rows[0].role
            };
            const id = user.id;
            const token = jwt.sign({id}, process.env.JWT_SECERT,{
                expiresIn: '24h',
            });

            req.session.user = user;
            res.json({auth: true, token:token, user:user});
          } else {
            res.json({ auth: false, msgErr: "¡Contraseña incorrecta!", msgn: 1 });
          }
        });
      } else {
        res.json({ auth: false, msgErr: "¡El usuario no existe!", msgn: 2 });
      }
    }
  );
});


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`running server`));