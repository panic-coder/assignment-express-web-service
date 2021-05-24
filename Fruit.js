const mongoose = require('mongoose');

mongoose.model('Fruit', {
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
})