const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Like
//=================================

router.post('/getLikes', (req, res) => {
  const idData = req.body.videoId
    ? { videoId: req.body.videoId }
    : { commentId: req.body.commentId };
  Like.find(idData).exec((err, likes) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post('/getDislikes', (req, res) => {
  const idData = req.body.videoId
    ? { videoId: req.body.videoId }
    : { commentId: req.body.commentId };
  Dislike.find(idData).exec((err, dislikes) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post('/uplike', (req, res) => {
  const idData = req.body.videoId
    ? {
        videoId: req.body.videoId,
        userId: req.body.userId,
      }
    : {
        commentId: req.body.commentId,
        userId: req.body.userId,
      };

  // like collection에 정보를 넣어줌
  const like = new Like(idData);
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    // dislike가 이미 클릭 되어있다면 dislike를 1 줄어주고 like를 늘려줌
    Dislike.findOneAndDelete(idData).exec((err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post('/unlike', (req, res) => {
  const idData = req.body.videoId
    ? {
        videoId: req.body.videoId,
        userId: req.body.userId,
      }
    : {
        commentId: req.body.commentId,
        userId: req.body.userId,
      };

  Like.findOneAndDelete(idData).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post('/updislike', (req, res) => {
  const idData = req.body.videoId
    ? {
        videoId: req.body.videoId,
        userId: req.body.userId,
      }
    : {
        commentId: req.body.commentId,
        userId: req.body.userId,
      };

  // like collection에 정보를 넣어줌
  const dislike = new Dislike(idData);
  dislike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    // dislike가 이미 클릭 되어있다면 like를 1 줄어주고 dislike를 늘려줌
    Like.findOneAndDelete(idData).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post('/undislike', (req, res) => {
  const idData = req.body.videoId
    ? {
        videoId: req.body.videoId,
        userId: req.body.userId,
      }
    : {
        commentId: req.body.commentId,
        userId: req.body.userId,
      };

  Dislike.findOneAndDelete(idData).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
