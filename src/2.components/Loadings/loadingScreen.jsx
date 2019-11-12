import React from 'react'
import loadingImg from '../../img/illustrations/loading.svg'


const loadingScreen = () => {
    return (
        <div className='container py-5 text-center'>
            <h1 className='py-5'>Preparing Your Movies</h1>
            <div className='d-flex justify-content-center my-4'>
                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success mx-2" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <img src={loadingImg} height='300px' className='mt-5' alt="Thank You For Your Patience" />
        </div>
    );
};

export default loadingScreen;