const mongoose = require('mongoose');

require('dotenv').config();

async function connectToDb() {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log('Connect to database');
	} catch (err) {
		console.log(err);
	}
}

module.exports = connectToDb;
