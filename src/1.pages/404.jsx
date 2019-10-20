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
            <div className='page bg-dark text-center p-5'>
                <h1 className='py-5 mt-5 white-text'>PAGE NOT FOUND</h1>
                <img
                    src={notFound}
                    alt="Page Not Found"
                    height='325px'
                />
            </div>
        );
    }
}

export default connect(null, { navItemChange }) (PageNotFound)