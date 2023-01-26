const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
  },
  { timestamps: true } // 만들 날과 업데이트 된 날짜를 표시
);

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike };
