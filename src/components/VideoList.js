import React, { Component } from 'react';
import { channel } from './../services/EventService';

export default function VideoList(props) {

    const { videos } = props || [];

    function handleClick(video) {
        channel.emit('video:select', video)
    }

    return (
        <ul className="video-list">
            {videos.map(video =>
                <li key={video.id} className="video" onClick={handleClick.bind(this, video)}>
                    <img src={video.image} />
                    <div>{video.name}</div>
                </li>
            )
            }

        </ul>
    )
}
