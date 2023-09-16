const express = require('express');
const router = express.Router();
const {createDB, createTable, createList, showTodos, addColumnsToTable, updateTodo, getTodo } = require('../controllers/todoController')

router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);
router.get('/show/todos', showTodos);
router.get('/create/column', addColumnsToTable);
router.put('/update/todo/:id', updateTodo);
router.get('/get/todo/:id', getTodo);

module.exports = router;