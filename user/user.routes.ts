//import
import {
    Router
} from 'express';
const usersRouter = Router();
const bodyParser = require('body-parser');
const md5 = require('md5');
const db = require('./../database');

//use
usersRouter.use(bodyParser.urlencoded({
    extended: false
}));
usersRouter.use(bodyParser.json());


//routes
usersRouter.get('/read', (req, res) => {
    db.all('SELECT * FROM user', function (err: any, rows: any) {
        var output: any = []
        if (err) {
            console.log(err)
        } else {
            if (rows.length === 0) {
                res.send('Empty database')
            } else {
                rows.forEach(function (row: any) {
                    output.push({
                        id: row.id,
                        name: row.firstname,
                        email: row.lastname,
                        password: row.password,
                    })
                })
                res.send(output)
            }
        }
    })
})

usersRouter.get('/user/:id', (req, res) => {
    let id = req.params.id;
    if (id !== '' && id !== undefined) {
        var sql = 'SELECT id, name, email, password FROM user WHERE id = ?';
        var params = [id];
        db.all(sql, params, function (err: any, rows: any) {
            var output: any = []
            if (err) {
                console.log(err)
            } else {
                if (rows.length === 0) {
                    res.send('Empty database')
                } else {
                    rows.forEach(function (row: any) {
                        output.push({
                            id: row.id,
                            name: row.firstname,
                            email: row.lastname,
                            password: row.password,
                        })
                    })
                    res.send(output)
                }
            }
        })
    } else {
        res.send("Unable to get this user check syntax");
    }
})

usersRouter.post('/create', (req, res, next) => {
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
    }
    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params = [data.name, data.email, data.password]
    db.run(sql, params, function (err: any, result: any) {
        if (err) {
            res.status(400).json({
                "error": err.message
            })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
})

usersRouter.post('/delete/:id', function (req: any, res: any) {
    let id = req.params.id;
    if (id !== '' && id !== undefined) {
        db.run('DELETE FROM user WHERE id = ?', id, function (err: any) {
            if (err) {
                console.log(err)
            } else {
                res.send('Success')
            }
        })
    } else {
        res.send('Unable to delete data. Check syntax')
    }
})

usersRouter.post('/update/:id', (req, res) => {
    let id = req.params.id;
    if (id !== '' && id !== undefined) {
        var sql = 'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?';
        var params = [req.body.name, req.body.email, req.body.password, id];
        db.run(sql, params, function (err: any) {
            if (err) {
                console.log(err)
            } else {
                res.send('Success')
            }
        })
    } else {
        res.send('Unable to delete data. Check syntax')
    }
})

export default usersRouter;