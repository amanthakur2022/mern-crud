// import dependencies
const express = require('express');
const connectToDb = require('./config/connectTodb');
const notesController = require('./controllers/notesController');
var cors = require('cors');

// load env variables
require('dotenv').config();

// create an express app
const app = express();

// config express app
app.use(express.json());
app.use(cors());

// var corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200  // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// connect to database
connectToDb();

// start our server
app.listen(process.env.PORT);

// routing
app.post('/api/notes', notesController.createNote);
app.get('/api/notes', notesController.fetchAllNotes);
app.get('/api/notes/:id', notesController.fetchNoteById);
app.put('/api/notes/:id', notesController.updateNote);
app.delete('/api/notes/:id', notesController.deleteNote);
