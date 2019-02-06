import React, { Component } from 'react';
import { channel } from './../services/EventService';
import ReactDom from 'react-dom'

class VideoPlayer extends Component {

    constructor(props) {
        super(props)

        this.videoElement = React.createRef();
        this.currentTime = 0;
    }

    handleClick() {
        this.onStop();
        channel.emit('video:toggleCinema')
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.video.url !== prevProps.video.url) {
            this.currentTime = 0;
        }
    }

    onPlay() {
        this.videoElement.current.currentTime = this.currentTime;

    }

    onStop() {
        this.currentTime = this.videoElement.current.currentTime;
    }

    render() {
        const { video, container } = this.props;

        if (!video.url) {
            return '';
        } else if (!container) {
            return 'carregando';
        } else {
            const element = (
                <div className="video-player">
                    <video controls ref={this.videoElement} onPlay={this.onPlay.bind(this)} onPause={this.onStop.bind(this)} autoPlay loop src={video.url} />
                    <button onClick={this.handleClick.bind(this)}>[ ]</button>
                </div>
            );

            return ReactDom.createPortal(element, container)
        }
    }
}

export default VideoPlayer;