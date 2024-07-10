// import dependencies
const express = require('express');
const connectToDb = require('./config/connectTodb');
const Note = require('./models/note');

// load env variables
require('dotenv').config();

// create an express app
const app = express();

// config express app
app.use(express.json());


// connect to database
connectToDb();

// start our server
app.listen(process.env.PORT);

// routing
app.get('/', async (req, res, next) => {
	res.status(200).json({ history: true });
});

app.post('/api/notes', async function (req, res, next) {
	try {
		  const newNote = await Note.create(req.body);
		  res.status(201).json({ note: newNote });
	} catch (err) {
		  res.status(500).json({ error: err.message });
	}
});
