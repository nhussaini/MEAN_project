const express = require("express");

const router = express.Router();

const Post = require('../models/post');


router.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
});

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message:'post added successfully',
      postId: createdPost._id
  });
  });

});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update was successful"});
  });

});

router.get('', (req, res, next) => {
  // const posts = [
  //   {
  //     id:'01a',
  //     title:'First server post',
  //     content:'This is coming form the server'
  //   },
  //   {
  //     id:'02b',
  //     title:'second server post',
  //     content:'This is also coming form the server'
  //   }
  // ];
  Post.find().then(documents => {
    res.status(200).json({
      message:'posts fetched successfully!',
      posts: documents
    });
  });
});

router.get('/:id', (req,res,next) =>{
  Post.findById(req.params.id).then(post =>{
    if(post){ //if post exists
      res.status(200).json(post);
    }else{
        res.status(404).json({message: "Post not found!"});
    }
  });
});

router.delete('/:id', (req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "post deleted!"});
  });

});

module.exports = router;