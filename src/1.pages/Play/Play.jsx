import React, { Component } from 'react'

// Video-React
import "../../../node_modules/video-react/dist/video-react.css"
import { Player, BigPlayButton, LoadingSpinner, ControlBar, ReplayControl, ForwardControl  } from 'video-react'


class Play extends Component {
    componentDidUpdate() {
        window.scrollTo(0, 0)
    }
    

    render() {
        return (
            <div>
                <h3 className='pb-5 mb-0 btn-deep-purple'>&nbsp;</h3>
                <Player
                    src="http://media.w3.org/2010/05/bunny/movie.mp4"
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

export default Play