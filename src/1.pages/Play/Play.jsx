import React, { Component } from 'react'
import Scroll from 'react-scroll'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { urlApi } from '../../3.helpers/database'
import { navItemChange } from '../../redux/1.actions'
import { onMoviePlay, calcMovieViews } from "../../redux/1.actions"

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
        movieData: {}
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()
        this.props.navItemChange('PLAY')
        this.getMovieData()
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //


    getMovieData = () => {
        const idMov = this.props.match.params.idMov
        const idUser = this.props.id
        this.props.onMoviePlay(idMov)
        this.props.calcMovieViews(idMov, idUser)
    }
    

    render() {
        if (!this.props.username) {
            return <Redirect to='/' />
        }
        
        return (
            <div className='badge-dark py-5'>
                {/* <div className='badge-dark py-4'>&nbsp;</div> */}
                <Player
                    src={urlApi.slice(0,urlApi.length-1) + this.props.movieUrl}
                    poster={this.props.moviePoster}
                    fluid={false}
                    width={window.innerWidth - (1.25 / 100 * window.innerWidth)}
                    height={window.innerHeight - (10 / 100 * window.innerHeight)}
                    playsInline
                    autoPlay
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

const mapStateToProps = ({user, movieGlobal}) => {
    return {
        ...user,
        ...movieGlobal
    }
}

export default connect(mapStateToProps, {
    navItemChange,
    onMoviePlay,
    calcMovieViews
})(Play)