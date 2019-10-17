import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MDBBtn} from 'mdbreact'


class Watchlist extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    
    render() {
        if (this.props.userObject.username === '' && this.props.userObject.role === '') {
            return <Redirect to='/home'></Redirect>
        }

        return (
            <div className='wallpaper2 page'>
                {/* Top Spacing Purpose */}
                <div className='mb-5'>&nbsp;</div>
                <div className='mb-5'>&nbsp;</div>
                {/* Top Spacing Purpose */}

                <div className="container">
                    <div className="card p-5">
                        <h2 className='mb-5'>SEDAP MANTAP</h2>
                        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus deserunt a ut tempora incidunt iure eaque architecto quo quis illum sint, tenetur eum voluptatum earum, itaque error? Eius, molestias vel!</h5>
                        <MDBBtn color='deep-purple' className='white-text mt-5'>INI Watchlist</MDBBtn>
                    </div>
                </div>

                {/* Bottom Spacing */}
                <div className='mt-5'>&nbsp;<br />&nbsp;</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userObject: state.user
    }
}

export default connect(mapStateToProps)(Watchlist)