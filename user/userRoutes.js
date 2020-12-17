"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var r = express.Router();
exports.default = r.get("/login", function (req, res) {
    res.send("Login routes");
});
