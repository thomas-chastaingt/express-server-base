"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import
var express_1 = require("express");
var usersRouter = express_1.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');
var db = require('./../database');
//use
usersRouter.use(bodyParser.urlencoded({
    extended: false
}));
usersRouter.use(bodyParser.json());
//routes
usersRouter.get('/read', function (req, res) {
    db.all('SELECT * FROM user', function (err, rows) {
        var output = [];
        if (err) {
            console.log(err);
        }
        else {
            if (rows.length === 0) {
                res.send('Empty database');
            }
            else {
                rows.forEach(function (row) {
                    output.push({
                        id: row.id,
                        name: row.firstname,
                        email: row.lastname,
                        password: row.password,
                    });
                });
                res.send(output);
            }
        }
    });
});
usersRouter.get('/user/:id', function (req, res) {
    var id = req.params.id;
    if (id !== '' && id !== undefined) {
        var sql = 'SELECT id, name, email, password FROM user WHERE id = ?';
        var params = [id];
        db.all(sql, params, function (err, rows) {
            var output = [];
            if (err) {
                console.log(err);
            }
            else {
                if (rows.length === 0) {
                    res.send('Empty database');
                }
                else {
                    rows.forEach(function (row) {
                        output.push({
                            id: row.id,
                            name: row.firstname,
                            email: row.lastname,
                            password: row.password,
                        });
                    });
                    res.send(output);
                }
            }
        });
    }
    else {
        res.send("Unable to get this user check syntax");
    }
});
usersRouter.post('/create', function (req, res, next) {
    var errors = [];
    if (!req.body.password) {
        errors.push("No password specified");
    }
    if (!req.body.email) {
        errors.push("No email specified");
    }
    if (errors.length) {
        res.status(400).json({
            'error': errors.join(',')
        });
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    };
    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    var params = [data.name, data.email, data.password];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        });
    });
});
usersRouter.post('/delete/:id', function (req, res) {
    var id = req.params.id;
    if (id !== '' && id !== undefined) {
        db.run('DELETE FROM user WHERE id = ?', id, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.send('Success');
            }
        });
    }
    else {
        res.send('Unable to delete data. Check syntax');
    }
});
usersRouter.post('/update/:id', function (req, res) {
    var id = req.params.id;
    if (id !== '' && id !== undefined) {
        var sql = 'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?';
        var params = [req.body.name, req.body.email, req.body.password, id];
        db.run(sql, params, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.send('Success');
            }
        });
    }
    else {
        res.send('Unable to delete data. Check syntax');
    }
});
exports.default = usersRouter;
