const express = require('express');
const cors = require('cors');

const app = express();

let users = [
    {
        id: 1,
        name: 'Rafid',
        age: 23
    },
    {
        id: 2,
        name: 'Leo',
        age: 21
    },
    {
        id: 3,
        name: 'Mario',
        age: 25
    }
];

app.use(cors());
app.use(express.urlencoded( { extended : false} ));
app.use(express.json());

app.get('/api/users', (req,res) => {
    res.json(users)
});

app.post('/api/user', (req,res) => {
    let user = req.body;
    user.id = users.length + 1;
    users = [...users, user];
    res.json(user);
})

app.put('/api/user/:id', (req,res) => {
    const updatedUser = req.body;
    const index = users.findIndex(user => user.id == req.params.id);
    users[index].name = updatedUser.name;
    users[index].age  = updatedUser.age;
    res.json(updatedUser);
})

app.delete('/api/user/:id', (req,res) => {
    const deletedUser = users.find(user => user.id == req.params.id);
    console.log(deletedUser)
    users = users.filter(user => user.id != req.params.id);
    res.json(deletedUser);
})

const port = 5000;
app.listen(port);