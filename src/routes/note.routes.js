const express = require("express");
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require("./../controllers/note.controller");
const authMiddleware = require("./../middlewares/auth.middleware");

router.get('/', authMiddleware , getNotes);
router.post('/', authMiddleware , createNote);
router.patch('/:id', authMiddleware , updateNote);
router.delete('/:id', authMiddleware , deleteNote);

module.exports = router;