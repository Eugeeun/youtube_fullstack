const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
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

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like };
