const express = require('express');
const router = express.Router();
const {createDB, createTable, createList, showTodos} = require('../controllers/todoController')

router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);
router.post('/create/list', createList);
router.get('/show/todos', showTodos);

module.exports = router;