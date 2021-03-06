// importation des plugins
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');//Rend les données du corps de la requête exploitable
const path = require('path');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message')
const conversationsRoutes = require('./routes/conversation')
const forumRoutes = require('./routes/forum')
const helmet = require('helmet')//aide à sécuriser les appli Express
require('dotenv').config()//Cache les infos sensible dans le dossier ".env"

//connection base de donnée
const sequelize = new Sequelize(process.env.DATABASE_URL);
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(express.json());

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*'); //qui peux faire une requête
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //quoi
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //comment
  next();
});


app.use(bodyParser.json());
app.use(helmet())//securisation HTTP headers

app.use('/images',express.static(path.join(__dirname,'images')));//middleware images

//Routes
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/forum', forumRoutes);

module.exports = app;