import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart-brain'
    }
});

console.log(postgres.select('*').from('users'));



const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: '123',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: '456',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    // login : {
    //     id: '987',
    //     hash: '',
    //     email: 'john@gmail.com'
    // }
}

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json("Error Logging In")
    }
})

app.post('/register', (req, res)=> {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    })
    database.users.push({ 
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json('No such user');
    }
})

app.put('/image', (req, res)=> {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })
    if (!found) {
        res.status(400).json('No such user');
    }
})


app.listen(3000, ()=> {
    console.log('App is running on Port: 3000');
})
