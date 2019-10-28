import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import moment from 'moment';
import Axios from 'axios';
import {connect} from 'react-redux';
import { urlApi } from '../../../3.helpers/database'
import {
    MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon,
    MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from 'mdbreact'


class ManageUser extends Component {
    _isMounted = false

    state = {
        userData : [],
        selectedUserId: 0,
        suspendUserId: 0,
        suspendUsername: '',
        editUsername: '',
        editEmail: '',
        editRole: 0,
        editStatus: '',
        modalOpen: false
    }

    // LIFECYCLE //
    componentDidMount() {
        this._isMounted = true
        this.getUserData()
    }
    
    componentWillUnmount() {
        this._isMounted = false
    }
    // LIFECYCLE //

    // GET DATA //
    getUserData = () => {
        Axios.post(urlApi + 'admin/getAllUser')
        .then(res => {
            console.log(res.data)
            if (this._isMounted) {
                this.setState({ userData: res.data })
            }
        })
        .catch(err => (
            console.log(err)
        ))
    }
    // GET DATA //

    // RENDER DATA //
    renderUserData = () => {
        return this.state.userData.map((val) => {
            if (val.id !== this.state.selectedUserId) {
                return (
                    <tr key={val.id}>
                        <td className='text-center'>{val.id}</td>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.roleName}</td>
                        <td>{moment(val.created_date).format("MMM Do YY")}</td>
                        <td className='text-center'>{val.status}</td>
                        {
                            this.props.roleUser === val.roleName || (this.props.roleUser === 'Admin' && val.roleName === 'Super Admin')
                            ?
                            null
                            :
                            <td className='text-center py-1'>
                                <MDBBtn color='indigo'
                                        className='white-text'
                                        data-tip='Edit'
                                        onClick={() => this.setState({
                                            selectedUserId:val.id,
                                            editUsername: val.username,
                                            editEmail: val.email,
                                            editRole: val.roleId,
                                            editStatus: val.status
                                        })}
                                >
                                    <MDBIcon icon="pen" />
                                </MDBBtn>
                                {
                                    val.status === 'Suspended'
                                    ?
                                    <MDBBtn color='red' className='white-text' disabled>
                                        <MDBIcon icon="ban" />
                                    </MDBBtn>
                                    :
                                    <MDBBtn color='red'
                                            className='white-text'
                                            data-tip='Suspend'
                                            onClick={() => this.setState({
                                                modalOpen: true,
                                                suspendUserId: val.id,
                                                suspendUsername: val.username
                                            })}
                                    >
                                        <MDBIcon icon="ban" />
                                    </MDBBtn>
                                }
                                <ReactTooltip place="top" />
                            </td>
                        }
                    </tr>
                )
            }

            return (
                <tr key={val.id}>
                    <td className='text-center'>{val.id}</td>
                    <td>
                        <input type='text'
                            placeholder='Username'
                            className='rounded shadow-sm p-1'
                            value={this.state.editUsername}
                            onChange={(e) => this.setState({editUsername: e.target.value})}
                        />
                    </td>
                    <td>
                        <input type='email'
                            placeholder='Email'
                            className='rounded shadow-sm p-1'
                            value={this.state.editEmail}
                            onChange={(e) => this.setState({ editEmail: e.target.value })}
                        />
                    </td>
                    <td>
                        <select className="rounded p-1 shadow-sm"
                            value={this.state.editRole}
                            onChange={(e) => this.setState({ editRole: e.target.value })}
                        >
                            <option value="2">Admin</option>
                            <option value="3">User</option>
                        </select>
                    </td>
                    <td>{moment(val.created_date).format("MMM Do YY")}</td>
                    <td className='text-center'>
                        <select className="rounded p-1 shadow-sm"
                            value={this.state.editStatus}
                            onChange={(e) => this.setState({ editStatus: e.target.value })}
                        >
                            <option value="Unverified">Unverified</option>
                            <option value="Verified">Verified</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </td>
                    <td className='text-center py-1'>
                        <MDBBtn color='indigo'
                                className='white-text'
                                data-tip='Save'
                                onClick={() => this.btnUpdateUser(val.id)}
                        >
                            <MDBIcon icon="check" />
                        </MDBBtn>
                        <MDBBtn color='red'
                                className='white-text'
                                data-tip='Cancel'
                                onClick={() => this.setState({ selectedUserId: 0 })}
                        >
                            <MDBIcon icon="times" />
                        </MDBBtn>
                    </td>
                    <ReactTooltip place="top" />
                </tr>
            )
        })
    }
    // RENDER DATA //

    // ACTIONS BUTTONS //
    btnUpdateUser = (idUser) => {
        Axios.post(urlApi + 'admin/updateUser', {
            id: idUser,
            username: this.state.editUsername,
            email: this.state.editEmail,
            roleId: this.state.editRole,
            status: this.state.editStatus
        }).then(res => {
            console.log('User Updated')
            this.setState({ selectedUserId: 0 })
            this.getUserData()
        }).catch(err => {
            console.log(err)
        })
    }

    btnSuspendUser = (idUser) => {
        Axios.post(urlApi + 'admin/suspendUser', {
            id: idUser
        }).then(res => {
            this.setState({
                modalOpen: false,
                suspendUserId: 0,
                suspendUsername: ''
            })
            this.getUserData()
        }).catch(err => {
            console.log(err)
        })
    }
    // ACTIONS BUTTONS //


    render() {
        return (
            <div className='container py-3'>
                <MDBTable hover responsive>
                    <MDBTableHead color='dark'>
                        <tr>
                            <th className='text-center'>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Signup Date</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            this.state.userData.length < 1
                            ?
                            <tr>
                                <td colSpan='7' className='text-center white-text bg-danger py-4'>
                                    Looks like there is no user data.
                                </td>
                            </tr>
                            :
                            this.renderUserData()
                        }
                    </MDBTableBody>
                </MDBTable>

                {/* MODAL SUSPEND CONFIRMATION */}
                <MDBModal isOpen={this.state.modalOpen} toggle={() => this.setState({ modalOpen: false })} centered>
                    <MDBModalHeader toggle={() => this.setState({ modalOpen: false })}>
                        Suspend User
                    </MDBModalHeader>
                    <MDBModalBody>
                        You are about to suspend <b>{this.state.suspendUsername}</b>.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="light"
                                onClick={() => this.setState({ modalOpen: false })}
                        >
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="red"
                                className='white-text'
                                onClick={() => this.btnSuspendUser(this.state.suspendUserId)}
                        >
                            Suspend
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {/* MODAL SUSPEND CONFIRMATION */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        roleUser: state.user.role
    }
}

export default connect(mapStateToProps)(ManageUser);