import React, { Component } from 'react';

class VideoPlayer extends Component {
    render() {
        const { video } = this.props;
        return (
            <div className="video-player">
                <video controls autoPlay loop src={video.url} />
                <button>[ ]</button>
            </div>
        );
    }
}

export default VideoPlayer;