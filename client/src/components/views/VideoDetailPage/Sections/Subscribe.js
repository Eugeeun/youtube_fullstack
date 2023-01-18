import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Subscribe(userInfo) {
  const [subscribeNumber, setSubscriberNumber] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    let creatorId = { userTo: userInfo.userTo };
    Axios.post('/api/subscribe/subscribeNumber', creatorId).then(response => {
      if (response.data.success) {
        setSubscriberNumber(response.data.subscribeNumber);
      } else {
        alert('구독자 수 정보를 받아오지 못 했습니다.');
      }
    });
    let loggedUser = {
      userTo: userInfo.userTo,
      userFrom: localStorage.getItem('userId'),
    };

    Axios.post('/api/subscribe/subscribed', loggedUser).then(response => {
      if (response.data.success) {
        setIsSubscribed(response.data.subscribed);
      } else {
        alert('정보를 받아오지 못 했습니다.');
      }
    });
  }, []);

  const onSubscribe = () => {
    const subscribeVar = {
      userTo: userInfo.userTo,
      userFrom: userInfo.userFrom,
    };

    if (isSubscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribeVar).then(response => {
        if (response.data.success) {
          setSubscriberNumber(subscribeNumber - 1);
          setIsSubscribed(!isSubscribed);
        } else {
          alert('구독을 취소하는 데에 실패했습니다.');
        }
      });
    } else {
      Axios.post('/api/subscribe/subscribe', subscribeVar).then(response => {
        if (response.data.success) {
          setSubscriberNumber(subscribeNumber + 1);
          setIsSubscribed(!isSubscribed);
        } else {
          alert('구독을 하는 데에 실패했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${isSubscribed ? '#AAAAAA' : '#CC0000'}`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
        onClick={onSubscribe}
      >
        {subscribeNumber} {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
