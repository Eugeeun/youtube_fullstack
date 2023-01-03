const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');

const { auth } = require('../middleware/auth');
const multer = require('multer');
let ffmpeg = require('fluent-ffmpeg');

/** Storage multer config */
let storage = multer.diskStorage({
  /** 파일을 저장할 위치 */
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },

  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },

  fileFilter: (req, file, callback) => {
    const ext = path.extname(file, originalname);
    if (ext !== ' .mp4') {
      return callback(req.status(400).end('only mp4 is allowed'), false);
    }
    callback(null, true);
  },
});

const upload = multer({ storage: storage }).single('file');

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  /** 비디오를 서버에 저장 */
  upload(req, res, err => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/uploadVideo', (req, res) => {
  /** 비디오 정보들을 저장 */
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.get('/getVideos', (req, res) => {
  /** 비디오를 DB에서 가져와 클라이언트에 보냄 */

  // populate를 해주는 이유는 writer의 모든 정보를 가져오기 위함임
  // 해주지 않으면 id밖에 못 가져옴
  Video.find()
    .populate('writer')
    .exec((err, videos) => {
      if (err) return res.status(400).json(err);
      res.status(200).json({ success: true, videos });
    });
});

router.post('/thumbnail', (req, res) => {
  /** 썸네일 생성을 하고 비디오 러닝타임을 가져오기 */

  let filePath = '';
  let fileDuration = '';
  /** 비디오 정보 가져오기 */
  ffmpeg.setFfmpegPath(
    'C:\\Program Files\\ffmpeg\\ffmpeg-2022-12-29-git-d39b34123d-essentials_build\\bin\\ffmpeg.exe'
  );
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  /** 썸네일 생성 */
  ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
      console.log('will generate ' + filenames.join(','));
      console.log(filenames);
      filePath = 'uploads/thumbnails/' + filenames[0];
    })
    .on('end', function () {
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on('error', function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      filename: 'thumbnail-%b.png',
    });
});

module.exports = router;
