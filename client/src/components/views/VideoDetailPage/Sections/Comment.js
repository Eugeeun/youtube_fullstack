import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {
  const videoId = props.postId;
  const user = useSelector(state => state.user);
  const [commentValue, setCommentValue] = useState('');

  const handleClick = event => {
    setCommentValue(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    const commentData = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post('/api/comment/saveComment', commentData).then(response => {
      if (response.data.success) {
        setCommentValue('');
        props.refreshFunc(response.data.result);
      } else {
        alert('코멘트를 저장하지 못했습니다.');
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <SingleComment
                key={index}
                refreshFunc={props.refreshFunc}
                comment={comment}
                postId={props.postId}
              />
            )
        )}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleClick}
          value={commentValue}
          placeholder='코멘트를 작성해 주세요'
        ></textarea>
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
