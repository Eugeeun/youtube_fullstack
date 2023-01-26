import React, { useState, useEffect } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
  const [likesLen, setLikesLen] = useState(0);
  const [dislikesLen, setDislikesLen] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const idData = props.video
    ? {
        videoId: props.videoId,
        userId: props.userId,
      }
    : {
        commentId: props.commentId,
        userId: props.userId,
      };
  useEffect(() => {
    Axios.post('/api/like/getLikes', idData).then(response => {
      if (response.data.success) {
        // 얼마나 많은 좋아요를 받았는지
        setLikesLen(response.data.likes.length);
        // 내가 이미 좋아요를 눌렀는지
        response.data.likes.map(like => {
          if (like.userId === props.userId) {
            setIsLiked(!isLiked);
          }
        });
      } else {
        alert('likes의 정보를 가져오지 못했습니다.');
      }
    });

    Axios.post('/api/like/getDislikes', idData).then(response => {
      if (response.data.success) {
        // 얼마나 많은 싫어요 받았는지
        setDislikesLen(response.data.dislikes.length);
        // 내가 이미 싫어요를 눌렀는지
        response.data.dislikes.map(dislike => {
          if (dislike.userId === props.userId) {
            setIsDisliked(!isDisliked);
          }
        });
      } else {
        alert('Dislikes의 정보를 가져오지 못했습니다.');
      }
    });
  }, []);

  const onLike = event => {
    if (!isLiked) {
      Axios.post('/api/like/uplike', idData).then(response => {
        if (response.data.success) {
          setLikesLen(likesLen + 1);
          setIsLiked(true);
          if (isDisliked) {
            setDislikesLen(dislikesLen - 1);
            setIsDisliked(false);
          }
        } else {
          alert('like를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/unlike', idData).then(response => {
        if (response.data.success) {
          setLikesLen(likesLen - 1);
          setIsLiked(false);
        } else {
          alert('like를 내리지 못했습니다.');
        }
      });
    }
  };

  const onDislike = event => {
    if (!isDisliked) {
      Axios.post('/api/like/updislike', idData).then(response => {
        if (response.data.success) {
          setDislikesLen(dislikesLen + 1);
          setIsDisliked(true);
          if (isLiked) {
            setLikesLen(likesLen - 1);
            setIsLiked(false);
          }
        } else {
          alert('dislike를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/undislike', idData).then(response => {
        if (response.data.success) {
          setDislikesLen(dislikesLen - 1);
          setIsDisliked(false);
        } else {
          alert('dislike를 내리지 못했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          <Icon
            type='like'
            theme={isLiked ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {likesLen} </span>
      </span>

      <span key='comment-basic-dislike'>
        <Tooltip title='Dislike'>
          <Icon
            type='dislike'
            theme={isDisliked ? 'filled' : 'outlined'}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>
          {dislikesLen}
        </span>
      </span>
    </div>
  );
}

export default LikeDislikes;
