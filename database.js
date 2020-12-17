"use strict";
var md5 = require('md5');
var sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
//database
var db = new sqlite3.Database(process.env.DB_NAME, function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log('Connected to the SQLite database.');
        db.run("CREATE TABLE user (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            name text, \n            email text UNIQUE, \n            password text, \n            CONSTRAINT email_unique UNIQUE (email)\n            )", function (err) {
            if (err) {
                // Table already created
            }
            else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
                db.run(insert, ["user", "user@example.com", md5("user123456")]);
            }
        });
    }
});
module.exports = db;
