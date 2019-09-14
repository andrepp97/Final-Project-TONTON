import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Jumbotron from '../../2.components/Jumbotron/Jumbotron'
import Carousel from '../../2.components/Carousel/Carousel'
import { MDBBadge } from 'mdbreact'


class Home extends Component {
    render() {
        return (
            <div className='page'>
                <Jumbotron />

                {/* Popular Section */}
                <div className="container-fluid mt-4 mb-n1">
                    <h4 className='ml-4'>
                        Popular &nbsp;
                        <Link to='/' className='font-small text-decoration-none'>
                            <MDBBadge color='deep-purple'>See More</MDBBadge>
                        </Link>
                    </h4>
                </div>
                <Carousel />

                {/* Masih Belom Tau Section */}
                <div className="container-fluid mt-4 mb-n1">
                    <h4 className='ml-4'>
                        New on TONTON &nbsp;
                        <Link to='/' className='font-small text-decoration-none'>
                            <MDBBadge color='deep-purple'>See More</MDBBadge>
                        </Link>
                    </h4>
                </div>
                <Carousel />
            </div>
        )
    }
}

export default Home