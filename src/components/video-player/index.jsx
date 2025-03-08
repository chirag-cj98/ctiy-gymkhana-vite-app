import React from 'react';
import ReactPlayer from 'react-player';
import './index.css'; // Import the CSS file

const VideoPlayer = (props) => {
  return (
    <div className="video-container">
      <ReactPlayer
        url={props.url}
        controls
        width="100%"
        height="100%"
        className="react-player"
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload', // Disable download button
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;