import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';


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
        if (widthBro >= 1280) {
            return 7
        } else if (widthBro < 1280 && widthBro >= 1120) {
            return 6
        } else if (widthBro < 1120 && widthBro >= 940) {
            return 5
        } else if (widthBro < 940 && widthBro >= 770) {
            return 4
        } else if (widthBro < 770 && widthBro >= 540) {
            return 3
        } else if (widthBro < 540) {
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
                        style={ widthBro > 599 ? { width:'170px' } : { width:'150px' } }>
                        <img src={val.poster} data-tip={val.movieName} className='rounded img-fluid img-responsive' alt={val.movieName} />
                            {
                                val.type === 'F'
                                ?
                                    <span
                                        className='badge-dark text-center mt-n2 rounded-bottom'
                                        style={{ letterSpacing: '2px', fontSize: '11px', fontWeight: 'bold' }}>
                                        FREE
                                    </span>
                                :
                                    <span
                                        className='btn-purple text-center mt-n2 rounded-bottom'
                                        style={{ letterSpacing: '2px', fontSize: '11px', fontWeight: 'bold' }}>
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
        <ReactTooltip />
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