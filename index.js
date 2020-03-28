const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./database');

const app = express();

app.use(cors());
app.use(express.urlencoded( { extended : false} ));
app.use(express.json());

app.get('/api/users', (req,res) => {
    connection.query(
        "SELECT * FROM `Users`",
            function(error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
});

app.post('/api/user', (req,res) => {
    let user = req.body;
    connection.query(
        "INSERT INTO `Users` (`name`, `age`) VALUES (?, ?);", [user.name, user.age],
            function(error, results, fields) {
            if (error) throw error;
            let newUser = { "id" : results.insertId, "name" : user.name, "age": user.age };
            res.json(newUser);
            });
})

app.put('/api/user/:id', (req,res) => {
    const user = req.body;
    connection.query(
        "UPDATE `Users` SET `name`=?, `age`=? WHERE id = ?;", [user.name, user.age, req.params.id],
            function(error, results, fields) {
            if (error) throw error;
            let newUser = { "id" : req.params.id, "name" : user.name, "age": user.age };
            res.json(newUser);
            });
})

app.delete('/api/user/:id', (req,res) => {
    connection.query(
        "DELETE FROM `Users` WHERE id = ?;", [req.params.id],
            function(error, results, fields) {
            if (error) throw error;
            
            res.json({"id" : req.params.id});
            });
})

const port = 5000;
app.listen(port);