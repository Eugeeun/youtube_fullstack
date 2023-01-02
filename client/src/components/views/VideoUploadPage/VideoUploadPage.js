import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const videoPrivateOption = [
  {
    value: 0,
    label: 'Private',
  },
  {
    value: 1,
    label: 'Public',
  },
];

const videoCategoryOption = [
  {
    value: 0,
    label: 'Film & Animation',
  },
  {
    value: 1,
    label: 'Autos & Vehicles',
  },
  {
    value: 2,
    label: 'Music',
  },
  {
    value: 3,
    label: 'Pets & Animals',
  },
];

function VideoUploadPage() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoPrivate, setVideoPrivate] = useState(false);
  const [videoCategory, setVideoCategory] = useState('Film & Animation');

  const onTitleChange = event => setVideoTitle(event.target.value);
  const onDescChange = event => setVideoDesc(event.target.value);
  const onPrivateChange = event => setVideoPrivate(event.target.value);
  const onCategoryChange = event => setVideoCategory(event.target.value);
  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    Axios.post('/api/video/uploadfiles', formData, config).then(response => {
      if (response.data.success) {
        let videoData = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        Axios.post('/api/video/thumbnail', videoData).then(response => {
          if (response.data.success) {
            console.log(response.data);
          } else {
            alert('썸네일 생성에 실패 했습니다.');
          }
        });
      } else alert('비디오 업로드를 실패했습니다.');
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  display: 'flex',
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type='plus' style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}
          <div>
            <img src='' alt='' />
          </div>
        </div>

        <br />
        <br />

        <label htmlFor=''>Title</label>
        <Input onChange={onTitleChange} value={videoTitle} />

        <br />
        <br />

        <label htmlFor=''>Description</label>
        <TextArea onChange={onDescChange} value={videoDesc} />

        <br />
        <br />

        <select name='' id='' onChange={onPrivateChange}>
          {videoPrivateOption.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select name='' id='' onChange={onCategoryChange}>
          {videoCategoryOption.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button type='primary' size='large' onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
