const db = require("../db/database");

exports.createDB = (req, res) => {
    let q = 'CREATE DATABASE todolist';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}

exports.createTable = (req, res) => {
    let q = 'CREATE TABLE todos(id int AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255),status TINYINT(1), PRIMARY KEY(id))';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("TABLE TODOS CREATED");
    });
}

exports.createList = (req, res) => {
    const q = "INSERT INTO todos SET ?";

    const { title, description, status } = req.body;

    db.query(q, { title, description, status }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
}

exports.showTodos = (req, res) => {
    const q = "SELECT * FROM todos";

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
}