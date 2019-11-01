const express = require ('express');

const app= express();


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
