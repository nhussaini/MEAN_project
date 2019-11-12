const express = require("express");
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid =  MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
        error= null;
    }
    cb(error, 'backend/images');
  },
  filename: (req,file, cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+ '-' + Date.now() + "." + ext);
  }
});

const Post = require('../models/post');


router.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
});

router.post('', multer({storage:storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host"); //constructs a url to our server
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/"+ req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message:'post added successfully',
      post: {
        ...createdPost,//copies the properties of all the other object and then overwrites the desrired property as below
        id: createdPost._id
      }
  });
  });

});

router.put('/:id', multer({storage:storage }).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/"+ req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update was successful"});
  });

});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;//+ sign converts the string coming from url to number. anything comes from url is of type string
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
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
