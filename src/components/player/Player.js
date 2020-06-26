import React, { Component } from 'react'
import ReactPlayer from 'react-player/youtube'


export default class PlayerDr extends Component {
    render() {
        return <ReactPlayer
            url={this.props.url} light
            playing 
            height={this.props.height}/>

    }
}