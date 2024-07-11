const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	title: String,
	body: String
});

const Note = mongoose.models.note || mongoose.model('note', noteSchema);

module.exports = Note;
