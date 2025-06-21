const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// static files 
app.use(express.static("public"));
//temple Engine
const handlebars=exphbs.create({extname:".hbs"})
app.engine('hbs',handlebars.engine)
app.set("view engine","hbs")

// Router 
// app.get('/',(req,res)=>{
//    res.render('home')
// })
const routes=require("./server/routes/students")
app.use('/',routes)
// listen port
app.listen(port, () => {
  console.log("listening port : " + port);
});
// 



