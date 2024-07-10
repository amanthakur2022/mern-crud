// import dependencies
const express = require('express');
const connectToDb = require('./config/connectTodb');
const Note = require('./models/note');

// load env variables
require('dotenv').config();

// create an express app
const app = express();

// connect to database
connectToDb();

// routing
app.post('/notes', async (req, res, next) => {
	// get data
	const title = req.body.title;
	const body = req.body.body;

	// create note
	try {
		const note = await Note.create({
			title: title,
			body: body
		});
		res.json({ note: note });
	} catch (err) {
		console.log(err);
	}
});

// start our server
app.listen(process.env.PORT);
