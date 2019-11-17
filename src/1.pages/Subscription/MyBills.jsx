import React, { Component } from 'react'
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {urlApi} from '../../3.helpers/database'
import {
    MDBTable, MDBTableBody, MDBTableHead, MDBBtn,
} from 'mdbreact'
import noData from "../../img/illustrations/no_data.svg"

class MyBills extends Component {
    state = {
        userBills: []
    }

    // LIFECYCLE //
    componentDidMount() {
        window.scrollTo(0,0)
        this.getUserBills()
        this.cobaData()
    }
    // LIFECYCLE //

    cobaData = () => {
        fetch(urlApi + 'admin/getAllGenre')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    // GET DATA //
    getUserBills = () => {
        Axios.post(urlApi + 'user/getUserBills', {
            idUser: this.props.id
        }).then(res => {
            this.setState({userBills: res.data})
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    // GET DATA //

    // RENDER DATA //
    renderUserBills = () => {
        return this.state.userBills.map((val, idx) => {
            return (
                <tr key={val.id}
                    className='white-text text-center'
                    style={{cursor:'pointer'}}
                    onClick={() => this.onBillClick(val.status)}
                >
                    <td>{idx+1}</td>
                    <td>Upgrade To Premium</td>
                    <td>
                        <NumberFormat
                        value={val.total_pay}
                        thousandSeparator={true}
                        displayType={'text'}
                        prefix={'Rp '}
                        />
                    </td>
                    <td>{val.status}</td>
                    <td>
                        {
                            val.countdown > 0
                            ?
                                `in ${val.countdown} minutes`
                            :
                                Math.abs(val.countdown) > 60
                                ?
                                    Math.floor(Math.abs(val.countdown) / 60) + ' hours ago'
                                :
                                    Math.abs(val.countdown) + ' minutes ago'
                        }
                    </td>
                </tr>
            )
        })
    }
    // RENDER DATA //

    onBillClick = (stat) => {
        if (stat === 'WAITING FOR PAYMENT') {
            window.location = '/user-payment'
        } else {
            alert(stat)
        }
    }


    render() {
        if (!this.props.username) {
            return <Redirect to='/' />
        }

        if (this.state.userBills.length < 1) {
            return (
                <div className="page main-backdrop py-5">
                    <div className="container py-5 text-center">
                        <img src={noData} height="360px" alt="No Data" />
                        <h5 className='white-text my-4'>You have no Bills for now.</h5>
                        <Link to='/subscription'>
                            <MDBBtn color='deep-purple' className='white-text'>
                                Check subscriptions
                            </MDBBtn>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <div className='page main-backdrop white-text py-5' style={{height:'100vh'}}>
                <h2 className='mb-5'>&nbsp;</h2>

                <div className="container pb-5">
                    <h3 className='text-center my-4'>My Bills</h3>

                    <MDBTable hover responsive>
                        <MDBTableHead color='deep-purple'>
                            <tr className='white-text text-center'>
                                <th>#</th>
                                <th>Description</th>
                                <th>Total Pay</th>
                                <th>Status</th>
                                <th>Expired</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {this.renderUserBills()}
                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.user
}

export default connect(mapStateToProps)(MyBills);