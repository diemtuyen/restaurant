const express = require('express');
const routes = require('./routes/index');
const tableRoute = require('./routes/table');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config()



let app = express();
const PORT = process.env.PORT || 5000;
const dbURL = process.env.MONGO_DB_URL

mongoose.connect(dbURL, function(err){
    if(err){
      console.log('Error connecting to: '+ dbURL)
    }
    else{
      console.log('Connected to: '+ dbURL)
    }
})


app.use(cors());
app.options('*', cors());   

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/table', tableRoute);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});