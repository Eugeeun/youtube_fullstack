import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
const { Textarea } = Input;

function SingleComment(props) {
  const user = useSelector(state => state.user);
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandleChange = event => {
    setCommentValue(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    const commentData = {
      content: commentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    Axios.post('/api/comment/saveComment', commentData).then(response => {
      if (response.data.success) {
        setCommentValue('');
        setOpenReply(false);
        props.refreshFunc(response.data.result);
      } else {
        alert('코멘트를 저장하지 못했습니다.');
      }
    });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key='comment-basic-reply-to'>
      Reply to
    </span>,
  ];

  const commentForm = openReply ? (
    <form style={{ display: 'flex' }} onSubmit={onSubmit}>
      <textarea
        style={{ width: '100%', borderRadius: '5px' }}
        onChange={onHandleChange}
        value={commentValue}
        placeholder='답글을 작성해 주세요'
      ></textarea>
      <br />
      <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
        Submit
      </button>
    </form>
  ) : null;

  return (
    <div>
      <Comment
        actions={actions}
        author
        avatar={<Avatar src alt />}
        content={<p>{props.comment.content}</p>}
      />
      {commentForm}
    </div>
  );
}

export default SingleComment;
