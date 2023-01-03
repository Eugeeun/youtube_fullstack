const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
  {
    /** 유저의 모든 정보를 가져올 수 있음 */
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true } // 만들 날과 업데이트 된 날짜를 표시
);

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };
