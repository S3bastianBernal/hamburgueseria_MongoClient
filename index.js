const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const routerBase = require('./routes/routes.js');
app.use('api/hamburguesas', routerBase);

require('dotenv').config;
const port = process.env.PORT444
app.use(express.json());
app.listen(port, () =>{
  console.log(`server corriendose en ${port}`);
})



