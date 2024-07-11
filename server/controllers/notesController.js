const Note = require('../models/note');

// get all notes
const fetchAllNotes = async (req, res) => {
	try {
		const getAllNotes = await Note.find(req.body);
		res.status(201).json({ note: getAllNotes });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// get note by id
const fetchNoteById = async (req, res) => {
	try {
		const noteId = req.params.id;
		const findNote = await Note.findById(noteId);
		res.status(201).json({ note: findNote });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// create note
const createNote = async (req, res) => {
	try {
		const newNote = await Note.create(req.body);
		res.status(201).json({ note: newNote });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// update note
const updateNote = async (req, res) => {
	try {
		const noteId = req.params.id;
		const updateNote = await Note.findByIdAndUpdate(noteId, req.body, { new: true });
		res.status(201).json({ note: updateNote });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// delete note
const deleteNote = async (req, res) => {
	try {
		const noteId = req.params.id;
		const updateNote = await Note.findByIdAndDelete(noteId, req.body);
		if (!updateNote) {
			res.status(500).json({ error: 'No note exist with the id' });
		} else {
			res.status(200).json({ message: 'Deleted Succesfully' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	fetchAllNotes,
	fetchNoteById,
	createNote,
	updateNote,
	deleteNote
};
