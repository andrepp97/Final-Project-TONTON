import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';


class ManageMovies extends Component {
    render() {
        return (
            <div className='container'>
                <MDBDataTable
                    theadColor="dark"
                    responsive
                    borderless
                    small
                />
            </div>
        );
    }
}

export default ManageMovies;