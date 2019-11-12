import React, { Component } from 'react'
import Scroll from 'react-scroll'
import axios from 'axios'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { urlApi } from '../../3.helpers/database'
import { navItemChange } from '../../redux/1.actions'
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact"
import LoadingScreen from '../../2.components/Loadings/loadingScreen'


let scroll = Scroll.animateScroll


class allCast extends Component {
    _isMounted = false

    state = {
        castData : [],
        itemsPerPage: 25,
        activePage: 1
    }

    // PAGINATION PAGE CHANGE //
    pageChange = (action) => {
        let currentPage = this.state.activePage

        if (action === 'next') {
            this.setState({ activePage: currentPage + 1 })
            currentPage += 1
        }else if (action === 'prev') {
            this.setState({ activePage: currentPage - 1 })
            currentPage -= 1
        }

        axios.post(urlApi + 'cast/castList', {
            limit: this.state.itemsPerPage,
            offset: this.state.itemsPerPage * (currentPage - 1)
        }).then(res => {
            if (this._isMounted) {
                console.log(res.data)
                this.setState({ castData: res.data })
            }
            scroll.scrollToTop()
        }).catch(err => {
            console.log(err)
        })
    }
    // PAGINATION PAGE CHANGE //


    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        scroll.scrollToTop()
        
        this.getAllCast()
        this.props.navItemChange('CAST')
    }
    
    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //


    // GET DATA //
    getAllCast = () => {
        axios.post(urlApi + 'cast/castList', {
            limit: this.state.itemsPerPage,
            offset: this.state.itemsPerPage * (this.state.activePage - 1)
        }).then(res => {
            if (this._isMounted) {
                console.log(res.data)
                this.setState({ castData: res.data })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    // GET DATA //


    // RENDER DATA //
    renderAllCast = () => {
        let jsx = this.state.castData.map(val => {
            return (
                <div key={val.id} style={{ width: "12rem" }} className='card rounded my-4 mx-4'>
                    <Link to={`/cast-details/${val.id}`} className='text-decoration-none rounded text-dark img-artist'>
                        <img className="img-fluid rounded-top opacity-90" src={val.image} alt={val.castName} />
                        <h6 className='text-center font-weight-bold pt-2 px-1'>{val.castName}</h6>
                    </Link>
                </div>
            )
        })
        return jsx
    }
    // RENDER DATA //


    render() {
        // LOADING //
        if (this.state.castData.length < 1) {
            return <LoadingScreen />
        }
        // LOADING //

        return (
            <div className='page main-backdrop'>
                {/* Top Spacing Purpose */}
                <h1 className='mb-5'>&nbsp;</h1>
                {/* Top Spacing Purpose */}

                <div className="container-fluid mb-0 pt-3">
                    <h4 className='ml-4 pb-2 white-text text-center text-uppercase'>
                        Popular Artists
                    </h4>
                </div>

                <div className="container-fluid pb-5">

                    {/* RENDER ALL CAST */}
                    <div className="row justify-content-center mb-5 px-5">
                        {this.renderAllCast()}
                    </div>
                    {/* RENDER ALL CAST */}

                    {/* PAGINATION */}
                    <div className="container px-5">
                        <MDBRow className='bg-light pt-3 rounded-pill'>
                            <MDBCol className='d-flex justify-content-center'>

                                <MDBPagination color='purple' className='font-weight-bold'>
                                    {
                                        this.state.activePage < 2
                                        ?
                                        <MDBPageItem className='mx-1 paginate-item' disabled>
                                            <MDBPageNav aria-label="Previous">
                                                <span aria-hidden="true">Previous</span>
                                            </MDBPageNav>
                                        </MDBPageItem>
                                        :
                                            <MDBPageItem className='mx-1' onClick={() => this.pageChange('prev')}>
                                                <MDBPageNav aria-label="Previous">
                                                    <span aria-hidden="true">Previous</span>
                                                </MDBPageNav>
                                            </MDBPageItem>
                                    }

                                    {
                                        this.state.activePage < 2
                                        ?
                                        null
                                        :
                                        <MDBPageItem className='mx-1'>
                                            <MDBPageNav>{this.state.activePage - 1}</MDBPageNav>
                                        </MDBPageItem>
                                    }

                                    <MDBPageItem className='mx-1' active>
                                        <MDBPageNav>{this.state.activePage}</MDBPageNav>
                                    </MDBPageItem>

                                    {
                                        this.state.castData.length < this.state.itemsPerPage || this.state.castData.length / (this.state.activePage + 1) === this.state.itemsPerPage
                                        ?
                                        <MDBPageItem className='mx-1' disabled>
                                            <MDBPageNav aria-label="Previous">
                                                <span aria-hidden="true">Next</span>
                                            </MDBPageNav>
                                        </MDBPageItem>
                                        :
                                        <>
                                        <MDBPageItem className='mx-1'>
                                            <MDBPageNav>{this.state.activePage + 1}</MDBPageNav>
                                        </MDBPageItem>
                                        <MDBPageItem className='mx-1' onClick={() => this.pageChange('next')}>
                                            <MDBPageNav aria-label="Previous">
                                                <span aria-hidden="true">Next</span>
                                            </MDBPageNav>
                                        </MDBPageItem>
                                        </>
                                    }
                                </MDBPagination>

                            </MDBCol>
                        </MDBRow>
                    </div>
                    {/* PAGINATION */}

                </div>
            </div>
        )
    }
}

export default connect(null, { navItemChange })(allCast)