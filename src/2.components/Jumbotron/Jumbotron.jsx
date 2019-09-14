import React, { Component } from 'react'
import { MDBJumbotron, MDBBtn, MDBRow, MDBCol, MDBCardTitle, MDBIcon } from "mdbreact";
import Background from '../../img/fight-club.jpg'


class Jumbotron extends Component {
    render() {
        return (
            <MDBRow>
                <MDBCol>
                    <MDBJumbotron style={{ padding: 0 }}>
                        <MDBCol className="text-white text-center pt-5" style={{ height:'100vh', background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${Background})`, backgroundSize:'cover', backgroundAttachment:'fixed' }}>
                            <MDBCol className="py-5">
                                <p>&nbsp;<br/>&nbsp;</p>
                                <MDBCardTitle className="h1-responsive pt-5 px-5 m-5">Upgrade to Premium and Treat Your Eyes with Some HD Shit</MDBCardTitle>
                                <MDBBtn outline color="white" className="mb-5">Subscribe Now &nbsp;<MDBIcon icon="play-circle" /></MDBBtn>
                            </MDBCol>
                        </MDBCol>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        )
    }
}

export default Jumbotron