const path = require('path');
const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const postsRoutes = require("./routes/posts");

const app= express();

mongoose.connect("mongodb+srv://Nasrullah:l1CL6m8xMT2gYvsR@cluster0-2nnew.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log("connected to database");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));


app.use("/api/posts", postsRoutes);



module.exports = app;
