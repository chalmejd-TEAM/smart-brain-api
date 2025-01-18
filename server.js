import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js'
import handleSignIn from './controllers/signin.js';
import handleImage from './controllers/image.js';
import handleProfile from './controllers/profile.js';

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.put('/image', (req, res) => { handleImage(req, res, db) });

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) });

app.listen(3000, ()=> {
    console.log('App is running on Port: 3000');
})
