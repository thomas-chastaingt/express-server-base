"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import
var express = require("express");
var index_1 = __importDefault(require("./user/index"));
//require
require('dotenv').config();
var db = require('./database');
var app = express();
var cors = require('cors');
var PORT = 8080;
var bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(index_1.default);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(PORT, function () {
    console.log("App is listening on port : " + PORT);
});
