import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import {Link} from 'react-router-dom';


const Carousel = (props) => {
    // Hooks
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const [widthBro, setWidthBro] = useState(window.innerWidth)
    // Hooks


    // Get Browser Size and Carousel Length
    window.addEventListener("resize", () => {
        setWidthBro(window.innerWidth)
    })

    const screenChanged = () => {
        if (widthBro >= 1290) {
            return 7
        } else if (widthBro < 1290 && widthBro >= 1120) {
            return 6
        } else if (widthBro < 1120 && widthBro >= 950) {
            return 5
        } else if (widthBro < 950 && widthBro >= 775) {
            return 4
        } else if (widthBro < 775 && widthBro >= 595) {
            return 3
        } else if (widthBro < 595) {
            return 2
        }
    }
    // Get Browser Size

    const renderMovies = () => {
        if (props.moviePoster !== "" && typeof props.moviePoster !== "undefined"){
            let jsx = props.moviePoster.map(val => {
                return (
                    <Link to={`/movie-details/${val.id}`} key={val.id}
                        className='card rounded text-decoration-none bg-transparent'
                        style={{ width:'170px' }}>

                        <img src={val.poster} className='rounded' width='170px' height='250px' alt={`[POSTER] ${val.movieName}`} />
                            {
                                val.type === 'F'
                                ?
                                    <span className='badge-dark text-center mt-n2 rounded-bottom' style={{ width: '170px', letterSpacing: '2px', fontSize: '11px', fontWeight: 'bold' }}>
                                        FREE
                                    </span>
                                :
                                    <span className='btn-purple text-center mt-n2 rounded-bottom' style={{ width: '170px', letterSpacing: '2px', fontSize: '11px', fontWeight: 'bold' }}>
                                        PREMIUM
                                    </span>
                            }
                            
                    </Link>
                )
            })
            return jsx
        }
    }


    return (
        <div className='py-3'>
            <ItemsCarousel
                numberOfCards={screenChanged()}
                slidesToScroll={screenChanged()-1}
                gutter={20}
                chevronWidth={40}
                disableSwipe={true}
                outsideChevron={false}
                showSlither={true}
                firstAndLastGutter={true}
                leftChevron={<button style={{ fontSize:'22px', fontWeight:'bold', fontFamily: 'Courier New' }}
                                    className='white-text opacity-90 rounded-circle btn btn-deep-purple px-3 ml-3'>{'<'}
                            </button>}
                rightChevron={<button style={{ fontSize: '22px', fontWeight: 'bold', fontFamily: 'Courier New' }}
                                    className='white-text opacity-90 rounded-circle btn btn-deep-purple px-3 mr-3'>{'>'}
                            </button>}
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
            >
                {renderMovies()}
            </ItemsCarousel>
        </div>
    )
}

export default Carousel