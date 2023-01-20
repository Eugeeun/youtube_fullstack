const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: { type: String },
  },
  { timestamps: true } // 만들 날과 업데이트 된 날짜를 표시
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
