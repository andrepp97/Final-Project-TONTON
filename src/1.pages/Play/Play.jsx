import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import axios from 'axios'
import Scroll from 'react-scroll'
import { urlApi } from '../../3.helpers/database'

// Video-React //
import "../../../node_modules/video-react/dist/video-react.css"
import {
    Player, BigPlayButton, LoadingSpinner,
    ControlBar, ReplayControl, ForwardControl
} from 'video-react'
// Video-React //

let scroll = Scroll.animateScroll


class Play extends Component {
    _isMounted = false

    state = {
        movieUrl: ''
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()

        this.getMovieUrl()
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    getMovieUrl = () => {
        const idMov = this.props.match.params.idMov

        axios.post(urlApi + 'movie/getMovieUrl', {
            idMov
        }).then(res => {
            if (this._isMounted) {
                this.setState({ movieUrl: res.data.filePath })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    

    render() {
        if (this.props.name === '') {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h3 className='pb-5 mb-0 btn-deep-purple'>&nbsp;</h3>
                <Player
                    src={urlApi.slice(0,urlApi.length-1) + this.state.movieUrl}
                    fluid={false}
                    width={window.innerWidth - (1 / 100 * window.innerWidth)}
                    height={window.innerHeight - (12.5 / 100 * window.innerHeight)}
                    playsInline
                    track
                    >
                    <BigPlayButton position="center" />
                    <LoadingSpinner />
                    <ControlBar>
                        <ReplayControl seconds={30} order={1.0} />
                        <ForwardControl seconds={30} order={2.2} />
                    </ControlBar>
                </Player>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        name: state.user.username,
        role: state.user.role,
        email: state.user.email
    }
}

export default connect(mapStateToProps)(Play)