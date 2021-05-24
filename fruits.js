const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

require('./Fruit')
const Fruit = mongoose.model('Fruit')

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Fruit database connected');
})

// I am alive check
app.get('/', (req, res) => {
    res.send('Inventory service is alive');
})

// Post a inventory
app.post('/inventory', (req, res) => {
    console.log(req.body);
    var fruit = new Fruit({
        name: req.body.name,
        quantity: req.body.quantity
    });
    fruit.save().then((data) => {
        console.log(data);
        console.log('New fruit created');
        res.send('New fruit created');
    }).catch((err) => {
        console.log(err);
        console.log('Failed creating fruit');
        res.send('Failed creating fruit');
    })
})

//Get all inventory
app.get('/inventory', (req, res) => {
    Fruit.find().then((fruits) => {
        console.log(fruits);
        res.json(fruits);
    }).catch((err) => {
        res.send('Failed fetch fruits');
    })
})

//Get inventory by name
app.get('/inventory/:name', (req, res) => {
    Fruit.find({name: req.params.name}).then((fruit) => {
        if(fruit) {
            res.json(fruit);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        res.send('Failed fetch fruits');
    })
})

//Delete a inventory
app.put('/inventory', (req, res) => {
    Fruit.findOneAndUpdate({name: req.body.name}, { quantity: req.body.quantity }).then((fruit) => {
        if(fruit) {
            res.json(fruit);
        } else {
            res.send('Failed delete fruit');    
        }
    }).catch((err) => {
        res.send('Failed delete fruit');
    })
})

//Delete a inventory
app.delete('/inventory/:name', (req, res) => {
    Fruit.findOneAndRemove({name: req.params.name}).then((fruit) => {
        if(fruit) {
            res.json(fruit);
        } else {
            res.send('Failed delete fruit');    
        }
    }).catch((err) => {
        res.send('Failed delete fruit');
    })
})

//creating server
app.listen(8081, () => {
    console.log('Up and running the fruit service');
})