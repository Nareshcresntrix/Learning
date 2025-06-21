const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser"); // post,put
const app = express();
const port = 3000;
app.use(bodyparser.json());
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "rest_api",
  password: "",
});
conn.connect((err, connection) => {
  if (err) throw err;
  console.log("database is successfully connected");
});

app.get("/", (req, res) => {
  let sql = "select * from users";
  conn.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      throw err;
    }
  });
});

//get item based on id
app.get("/users/:id", (req, res) => {
  console.log("id: " + req.params.id);
  const sql = `select * from users where id=${req.params.id}`;
  conn.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      throw err;
    }
  });
});

app.post("/adduser", (req, res) => {
  console.log("Received req.body:", req.body);
  const { NAME } = req.body;
  conn.query("INSERT INTO users(NAME) VALUES(?)", [NAME], (err, result) => {
    // if(err){
    //     return res.json({status:"ERROR",err})
    // }
    // return res.json({status:"success",result})
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
app.delete("/deleteuser/:id", (req, res) => {
  conn.query(`delete from users where id=${req.params.id}`,(err, result) => {
    if (err) {
      throw err;
    }
    return res.send(result);
  });
});
app.listen(port, () => {
  console.log("port is listening in 3000");
});
app.put("/updateuser/:id",(req,res)=>{
    const {NAME}=req.body
    const {id}=req.params
    conn.query("update users set NAME=? where id=?",[NAME,id],(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})
// app.post('/adduser',(req,res)=>{
//     let newuser=req.body
//     conn.query("insert into users set ?",newuser,(err,result)=>{
//         if(err){
//             return res.json({status:"ERROR",err})
//         }
//         return res.json({status:"success",result})
//     })
// })
