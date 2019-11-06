const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message:'post added successfully'
  })
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id:'01a',
      title:'First server post',
      content:'This is coming form the server'
    },
    {
      id:'02b',
      title:'second server post',
      content:'This is also coming form the server'
    }
  ];

  res.status(200).json({
    message:'posts fetched successfully!',
    posts: posts
  });

});

module.exports = app;
