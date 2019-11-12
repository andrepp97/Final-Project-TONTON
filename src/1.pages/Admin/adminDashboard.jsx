import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBCard } from 'mdbreact'
import windowSize from 'react-window-size'
import Scroll from 'react-scroll'
import ReactTooltip from 'react-tooltip'

import { navItemChange } from '../../redux/1.actions'
import Logo from '../../img/tonton.png'
import './admin.css'

// IMPORT ADMIN PAGES //
import ManageUser from './AdminPage/ManageUser'
import ManageMovies from './AdminPage/ManageMovies'
import ManageGenre from './AdminPage/ManageGenre'
import ManageArtist from './AdminPage/ManageArtist'
// IMPORT ADMIN PAGES //

let scroll = Scroll.animateScroll


class adminDashoard extends Component {
    _isMounted = false

    state = {
        selectedTab: 'Users'
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()
        this.props.navItemChange('ADMIN')
    }

    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //


    render() {
        if (this.props.roleUser === 'User' || this.props.name === '') {
            return <Redirect to='/home' />
        }

        return (
            <div className='page'>
                <div className="sidebar">
                    {
                        this.props.windowWidth < 752
                        ?
                        <img src={Logo} alt="TONTON.ID" className="img-fluid px-2" />
                        :
                        <img src={Logo} alt="TONTON.ID" className="img-fluid my-n3 px-3" />
                    }
                    <MDBListGroup className="list-group-flush mt-3">
                        {
                            this.props.windowWidth < 752
                            ?
                            <>
                                <ReactTooltip place="right" />
                                <MDBListGroupItem 
                                    className='item-bro rounded px-3'
                                    data-tip="Users"
                                    onClick={() => this.setState({selectedTab: 'Users'})}
                                    active = {this.state.selectedTab === 'Users' ? true : false}
                                >
                                    <MDBIcon icon="user"/>
                                </MDBListGroupItem>
                                <MDBListGroupItem 
                                    className='item-bro rounded px-3'
                                    data-tip="Movies"
                                    onClick={() => this.setState({selectedTab: 'Movies'})}
                                    active = {this.state.selectedTab === 'Movies' ? true : false}
                                >
                                    <MDBIcon icon="film"/>
                                </MDBListGroupItem>
                                <MDBListGroupItem
                                    className='item-bro rounded px-3'
                                    data-tip="Genres"
                                    onClick={() => this.setState({selectedTab: 'Genres'})}
                                    active = {this.state.selectedTab === 'Genres' ? true : false}
                                >
                                    <MDBIcon icon="stream"/>
                                </MDBListGroupItem>
                                <MDBListGroupItem
                                    className='item-bro rounded px-3'
                                    data-tip="Artists"
                                    onClick={() => this.setState({selectedTab: 'Artists'})}
                                    active = {this.state.selectedTab === 'Artists' ? true : false}
                                >
                                    <MDBIcon icon="users"/>
                                </MDBListGroupItem>
                            </>
                            :
                            <>
                                <MDBListGroupItem
                                    className='item-bro rounded-pill'
                                    onClick={() => this.setState({selectedTab: 'Users'})}
                                    active = {this.state.selectedTab === 'Users' ? true : false}
                                >
                                    <MDBIcon icon="user"/>
                                    <span>Users</span>
                                </MDBListGroupItem>
                                <MDBListGroupItem
                                    className='item-bro rounded-pill'
                                    onClick={() => this.setState({selectedTab: 'Movies'})}
                                    active = {this.state.selectedTab === 'Movies' ? true : false}
                                >
                                    <MDBIcon icon="film"/>
                                    <span>Movies</span>
                                </MDBListGroupItem>
                                <MDBListGroupItem 
                                    className='item-bro rounded-pill'
                                    onClick={() => this.setState({selectedTab: 'Genres'})}
                                    active = {this.state.selectedTab === 'Genres' ? true : false}
                                >
                                    <MDBIcon icon="stream"/>
                                    <span>Genres</span>
                                </MDBListGroupItem>
                                <MDBListGroupItem 
                                    className='item-bro rounded-pill'
                                    onClick={() => this.setState({selectedTab: 'Artists'})}
                                    active = {this.state.selectedTab === 'Artists' ? true : false}
                                >
                                    <MDBIcon icon="users"/>
                                    <span>Artists</span>
                                </MDBListGroupItem>
                            </>
                        }
                    </MDBListGroup>

                    <Link to='/' style={{bottom:10, position:'fixed', textDecoration:'none'}}>
                        <MDBListGroupItem className='item-bro py-1 px-3' data-tip={this.props.windowWidth < 752 ? 'Main Website' : null}>
                            <MDBIcon icon="chevron-circle-left" />
                                {this.props.windowWidth < 752 ? null : <span>Main Website</span>}
                        </MDBListGroupItem>
                    </Link>
                </div>

                <div className="admin-content p-5">
                    <div className='container mb-5'>
                        <MDBCard className='text-center'>
                            <h5 className='font-weight-bold text-uppercase my-3 px-2'>
                                TONTON / <span className='grey-text'>{this.state.selectedTab}</span>
                            </h5>
                        </MDBCard>
                    </div>
                    {/* ADMIN SWITCH CONTENT */}
                    {this.state.selectedTab === 'Users' ? <ManageUser /> : null}
                    {this.state.selectedTab === 'Movies' ? <ManageMovies /> : null}
                    {this.state.selectedTab === 'Genres' ? <ManageGenre /> : null}
                    {this.state.selectedTab === 'Artists' ? <ManageArtist /> : null}
                    {/* ADMIN SWITCH CONTENT */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        name: state.user.username,
        roleUser: state.user.role,
        email: state.user.email,
        activeTab: state.user.activeTab
    }
}

export default connect(mapStateToProps, { navItemChange })(windowSize(adminDashoard))