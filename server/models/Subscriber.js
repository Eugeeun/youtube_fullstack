const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true } // 만들 날과 업데이트 된 날짜를 표시
);

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber };
