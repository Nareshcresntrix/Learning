const express= require("express")
const mysql=require("mysql")
const bodypraser=require("body-parser")
const app= express ()
const port=3000
app.use(bodypraser.json())

const conn=mysql.createConnection({
    host:"localhost",
    database:"events_table",
    user:"root",
    password:""
})

conn.connect((err,connection)=>{
    if(err)throw err
    console.log("database connect successfully")
})




app.listen(port,()=>{
    console.log("port is listening 3000")
})
