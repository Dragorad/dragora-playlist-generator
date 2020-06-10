import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { demoUrls } from './demoUrls'


export default class PlayerDr extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         playing: false,
    //         url: this.props.url
    //     }
    // }
    // setPlayStop() {
    //     this.setState(state => ({ playing: !state.playing }))
    // }
    render() {
        return <ReactPlayer 
        url={this.props.url} light  />

    }
}