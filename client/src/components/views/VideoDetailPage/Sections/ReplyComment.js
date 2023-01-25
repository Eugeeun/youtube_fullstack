import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
  const [childCommentNum, setChildCommentNum] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentLists.map((comment, index) => {
      if (comment.responseTo === props.parentCommentId) commentNumber++;
      setChildCommentNum(commentNumber);
    });
  }, [props.commentLists]);

  const renderReplyComment = parentCommentId =>
    props.commentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', margin: '40px' }} key={index}>
            <SingleComment
              refreshFunc={props.refreshFunc}
              comment={comment}
              postId={props.videoId}
            />
            <ReplyComment
              refreshFunc={props.refreshFunc}
              parentCommentId={comment._id}
              commentLists={props.commentLists}
              postId={props.videoId}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {childCommentNum > 0 && (
        <p
          style={{ fontSize: '14px', margin: 0, color: 'gray' }}
          onClick={onHandleChange}
        >
          View {childCommentNum} more comment(s)
        </p>
      )}
      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
