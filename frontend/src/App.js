import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App() {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		createForm.title = '';
		createForm.body = '';
		setShow(false);
	};

	const handleShow = () => setShow(true);

	const [notes, setNotes] = useState([]);
	const [createForm, setCreateForm] = useState({
		title: '',
		body: ''
	});

	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		// Fetch the notes
		const response = await axios.get('http://localhost:3000/api/notes');

		// Set to state
		setNotes(response.data.note);
	};

	const createNote = async (e) => {
		e.preventDefault();
		const res = await axios.post('http://localhost:3000/api/notes', createForm);

		setNotes([...notes, res.data.note]);

		setCreateForm({
			title: '',
			body: ''
		});
		handleClose();
		fetchNotes();
	};

	const updateCreateFormField = (e) => {
		const { name, value } = e.target;
		setCreateForm({
			...createForm,
			[name]: value
		});
	};

	return (
		<div className="container mt-5">
			<Button className="mb-5" variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Notes</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={createNote}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Title</Form.Label>
							<Form.Control
								value={createForm.title}
								onChange={updateCreateFormField}
								name="title"
								type="text"
								placeholder="Title"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Body</Form.Label>
							<Form.Control
								value={createForm.body}
								onChange={updateCreateFormField}
								name="body"
								as="textarea"
								rows={3}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" type="submit" onClick={createNote}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Body</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{notes &&
						notes.map((note) => (
							<tr key={note._id}>
								<td>{note._id}</td>
								<td>{note.title}</td>
								<td>{note.body}</td>
								<td className="text-center">
									<ButtonGroup aria-label="Basic example">
										<Button variant="secondary">Edit</Button>
										<Button variant="danger">Delete</Button>
									</ButtonGroup>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</div>
	);
}

export default App;
