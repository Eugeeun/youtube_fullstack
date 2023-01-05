import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import SideVideo from './Sections/SideVideo';

function VideoDetailPage() {
  const videoId = useParams().videoId;
  const [videoDetail, setVideoDetail] = useState([]);
  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', { videoId: videoId }).then(
      response => {
        if (response.data.success) {
          setVideoDetail(response.data.videoDetail);
        } else {
          alert('비디오 정보를 가져오지 못했습니다.');
        }
      }
    );
  }, []);

  return videoDetail.writer ? (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
          <video
            style={{ width: '100%' }}
            src={`http://localhost:5000/${videoDetail.filePath}`}
            controls
          />
          <List.Item actions>
            <List.Item.Meta
              avatar={<Avatar src={videoDetail.writer.image} />}
              title={videoDetail.writer.name}
              description={videoDetail.description}
            />
          </List.Item>
          {/* Comments */}
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  ) : (
    <div>Loading...</div>
  );
}

export default VideoDetailPage;
