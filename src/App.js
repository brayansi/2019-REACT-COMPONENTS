import React, { Component } from 'react';
import './App.css';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import VideoCinema from './components/VideoCinema';
import VideoInline from './components/VideoInline';
import { VideoService } from './services/VideoService';
import { channel } from './services/EventService';


class App extends Component {

    constructor(props) {
        super(props);

        this.inlineVideo = React.createRef();
        this.cinemaVideo = React.createRef();

        this.state = {
            videos: [],
            selectedVideo: {},
            videoContainerElement: this.inlineVideo
        }

        this.selectVideo = this.selectVideo.bind(this);
        this.toggleCinema = this.toggleCinema.bind(this);
    }

    async componentDidMount() {
        const videos = await VideoService.list()
        this.setState({ videos })
        this.selectVideo(videos[0])

        channel.on('video:select', this.selectVideo);
        channel.on('video:toggleCinema', this.toggleCinema);

    }

    componentWillUnmount() {
        channel.removeListener('video:select', this.selectVideo);
        channel.removeListener('video:toggleCinema', this.toggleCinema);

    }

    toggleCinema() {
        const currentElement = this.state.videoContainerElement;
        let newContainer = currentElement === this.inlineVideo ? this.cinemaVideo : this.inlineVideo;
        this.setState({
            videoContainerElement: newContainer
        })
    }

    selectVideo(video) {
        this.setState({
            selectedVideo: video
        })
    }

    render() {
        const { state } = this;
        return (
            <div className="App">
                <VideoList videos={state.videos} />
                <VideoInline>
                    <div ref={this.inlineVideo}></div>
                </VideoInline>
                <VideoPlayer video={state.selectedVideo} container={state.videoContainerElement.current} />
                <VideoCinema isActive={state.videoContainerElement == this.cinemaVideo}>
                    <div ref={this.cinemaVideo}></div>
                </VideoCinema>
            </div>
        );
    }
}

export default App;
