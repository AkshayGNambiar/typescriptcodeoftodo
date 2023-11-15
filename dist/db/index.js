"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Todo = void 0;
const mongoose = require("mongoose");
// Rest of your TypeScript code here
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});
const User = mongoose.model('User', userSchema);
exports.User = User;
const Todo = mongoose.model('Todo', todoSchema);
exports.Todo = Todo;
