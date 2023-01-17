const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscriber) => {
    if (err) return res.status(400).json(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscriber.length });
  });
});

router.post('/subscribed', (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscriber) => {
    if (err) return res.status(400).json(err);
    let isSubscribe = subscriber.length !== 0 ? true : false;
    res.status(200).json({ success: true, subscribed: isSubscribe });
  });
});

module.exports = router;
