import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBCard, MDBBtn, MDBModal, MDBModalHeader } from 'mdbreact'
import windowSize from 'react-window-size'
import Scroll from 'react-scroll'
import ReactTooltip from 'react-tooltip'

import { navItemChange } from '../../redux/1.actions'
import './admin.css'

// IMPORT ADMIN PAGES //
import ManageUser from './AdminPage/ManageUser'
import ManagePayment from './AdminPage/ManagePayment'
import ManageMovies from './AdminPage/ManageMovies'
import ManageGenre from './AdminPage/ManageGenre'
import ManageArtist from './AdminPage/ManageArtist'
// IMPORT ADMIN PAGES //

let scroll = Scroll.animateScroll


class adminDashoard extends Component {
    _isMounted = false

    state = {
        selectedTab: 'Users',
        modalOpen: false
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
            {/* TOOLTIP & MODAL */}
                <ReactTooltip html={true} multiline={true} />
                {/* MODAL USER */}
                <MDBModal
                    isOpen={this.state.modalOpen}
                    toggle={() => this.setState({ modalOpen: false })}
                    side
                    size="sm"
                    position="top-left"
                >
                    <MDBModalHeader toggle={() => this.setState({ modalOpen: false })}>
                        <h5>{this.props.name}</h5>
                        <span className='grey-text font-small'>{this.props.roleUser}</span>
                    </MDBModalHeader>
                </MDBModal>
                {/* MODAL USER */}
            {/* TOOLTIP & MODAL */}

                <div className="sidebar">
                    <div className="container text-center white-text py-4">
                        {
                            this.props.windowWidth < 800
                            ?
                            <MDBBtn color='transparent'
                                    className='white-text rounded-circle mb-4'
                                    onClick={() => this.setState({modalOpen:true})}
                            >
                                <MDBIcon icon="user-tie" />
                            </MDBBtn>
                            :
                            <>
                                <MDBIcon icon="user-tie" size='3x' />
                                <div className='mt-2'>
                                    <p style={{fontSize: '16px'}}>{this.props.name}</p>
                                    <p className='mt-n3 grey-text font-small'>{this.props.roleUser}</p>
                                </div>
                            </>
                        }
                    </div>
  
                    <MDBListGroup className="list-group-flush">
                        {
                            this.props.windowWidth < 800
                            ?
                            <>
                                <MDBListGroupItem 
                                    className='item-bro rounded-pill w-100'
                                    data-tip="Users"
                                    onClick={() => this.setState({selectedTab: 'Users'})}
                                    active = {this.state.selectedTab === 'Users' ? true : false}
                                >
                                    <MDBIcon icon="user"/>
                                </MDBListGroupItem>
                                <MDBListGroupItem 
                                    className='item-bro rounded-pill w-100'
                                    data-tip="Payment"
                                    onClick={() => this.setState({selectedTab: 'Payment'})}
                                    active = {this.state.selectedTab === 'Payment' ? true : false}
                                >
                                    <MDBIcon icon="cash-register" />
                                </MDBListGroupItem>
                                <MDBListGroupItem 
                                    className='item-bro rounded-pill w-100'
                                    data-tip="Movies"
                                    onClick={() => this.setState({selectedTab: 'Movies'})}
                                    active = {this.state.selectedTab === 'Movies' ? true : false}
                                >
                                    <MDBIcon icon="film"/>
                                </MDBListGroupItem>
                                <MDBListGroupItem
                                    className='item-bro rounded-pill w-100'
                                    data-tip="Genres"
                                    onClick={() => this.setState({selectedTab: 'Genres'})}
                                    active = {this.state.selectedTab === 'Genres' ? true : false}
                                >
                                    <MDBIcon icon="stream"/>
                                </MDBListGroupItem>
                                <MDBListGroupItem
                                    className='item-bro rounded-pill w-100'
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
                                    onClick={() => this.setState({selectedTab: 'Payment'})}
                                    active = {this.state.selectedTab === 'Payment' ? true : false}
                                >
                                    <MDBIcon icon="cash-register" />
                                    <span>Payment</span>
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

                    <Link to='/' style={{bottom:25, position:'fixed', textDecoration:'none'}}>
                        <MDBListGroupItem className='item-bro rounded-circle px-2 py-1' data-tip='Main Website'>
                            <MDBIcon icon="chevron-circle-left" />
                        </MDBListGroupItem>
                    </Link>
                </div>

                {/* ADMIN CONTENT */}
                <div className="admin-content px-2 py-3">
                    <div className='container mb-5'>
                        <MDBCard className='text-center'>
                            <h5 className='font-weight-bold text-uppercase my-3 px-2'>
                                TONTON / <span className='grey-text'>{this.state.selectedTab}</span>
                            </h5>
                        </MDBCard>
                    </div>
                    {/* ADMIN SWITCH CONTENT */}
                    {this.state.selectedTab === 'Users' ? <ManageUser /> : null}
                    {this.state.selectedTab === 'Payment' ? <ManagePayment /> : null}
                    {this.state.selectedTab === 'Movies' ? <ManageMovies /> : null}
                    {this.state.selectedTab === 'Genres' ? <ManageGenre /> : null}
                    {this.state.selectedTab === 'Artists' ? <ManageArtist /> : null}
                    {/* ADMIN SWITCH CONTENT */}
                </div>
                {/* ADMIN CONTENT */}
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