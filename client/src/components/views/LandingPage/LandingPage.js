import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Axios.get('/api/video/getVideos').then(response => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert('비디오 가져오기를 실패했습니다.');
      }
    });
  }, []);

  const renderCards = videos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <a href={`/video/${video._id}`} style={{ margin: '1px' }}>
            <div
              style={{
                position: 'relative',
                marginRight: '40px',
              }}
            >
              <img
                src={`http://localhost:5000/${video.thumbnail}`}
                alt='thumbnail'
                style={{ width: '100%', borderRadius: '20px' }}
              />
              <div className='duration'>
                <span>
                  {minutes}:{seconds}
                </span>
              </div>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=''
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: '2.4rem' }}>{video.views} views</span> -
        <span>{moment(video.createdAt).format('MMM Do YY')}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}>Recommended</Title>

      <hr />
      <Row gutter={[32, 16]}></Row>
      {renderCards}
    </div>
  );
}

export default LandingPage;
