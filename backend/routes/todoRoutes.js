const express = require('express');
const router = express.Router();
const {createDB, createTable, createList} = require('../controllers/todoController')

router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);


module.exports = router;