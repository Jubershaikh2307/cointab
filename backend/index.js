const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()

app.use(express.json())

app.use(cors())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cointab"
})

app.get("/", (req, res) => {
    const sql=`SELECT * FROM users`
    connection.query(sql,(err,result)=>{
        if(err) console.log(err)
        res.send(result)
    })
})

app.post("/adduser", (req, res) => {
    const { name, address, picture } = req.body
    var sql = `INSERT INTO users (name, address,picture) VALUES ('${name}', '${address}','${picture}')`;
    try {
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                res.send({ responce: -1, err })
            } else {
                res.send({ responce: 1, result })
            }
        })
    } catch (error) {

    }
})

app.get("/delete",(req,res)=>{
    var sql = `TRUNCATE TABLE users`;
    try {
        connection.query(sql,(err,result)=>{
            if(err)console.log(err)
            console.log(result);
            res.send({responce:1})
        })
    } catch (error) {
        
    }
})

app.listen(3001, async () => {
    try {
        connection.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Connected to SQL DB")
                connection.query("CREATE DATABASE IF NOT EXISTS cointab", (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Connected to cointab")
                        connection.query("CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), address VARCHAR(255) ,picture VARCHAR(255))", (err, result) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(result)
                            }
                        })
                    }
                })
            }
        })
        console.log("listen at port no. 3001");
    } catch (error) {
        console.log("Erorr", error)
    }

})