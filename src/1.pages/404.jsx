import React, { Component } from 'react'
import { connect } from "react-redux"
import { navItemChange } from "../redux/1.actions"
import notFound from '../img/illustrations/404.svg'


class PageNotFound extends Component {
    componentDidMount() {
        this.props.navItemChange('')
    }
    

    render() {
        return (
            <div className='page bg-secondary text-center'>
                <h1 className='bg-dark py-3'>&nbsp;</h1>
                <h2 className='py-3'>PAGE NOT FOUND</h2>
                <img
                    src={notFound}
                    alt="Page Not Found"
                    className='pb-5 pt-4'
                    style = {{ height:'75vh' }}
                />
            </div>
        );
    }
}

export default connect(null, { navItemChange }) (PageNotFound)