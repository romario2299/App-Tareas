const mongoose = require('mongoose');

let uri = process.env.URLDB;

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
    }, 
    (error, res) => {
        if(error){
            throw error;
        } else {
            console.log('Conectado a db');
        }
});