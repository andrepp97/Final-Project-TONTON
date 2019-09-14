import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import {Link} from 'react-router-dom'


const Carousel = () => {
    // Hooks
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const [widthBro, setWidthBro] = useState(window.innerWidth)
    // Hooks


    // Get Browser Size
    window.addEventListener("resize", () => {
        setWidthBro(window.innerWidth)
    })

    const screenChanged = () => {
        if (widthBro > 1280) {
            return 6
        } else if (widthBro <= 1280 && widthBro > 1080) {
            return 5
        } else if (widthBro <= 1080 && widthBro > 880) {
            return 4
        } else if (widthBro <= 880 && widthBro > 680) {
            return 3
        } else {
            return 2
        }
    }
    // Get Browser Size


    return (
        <div className='pt-3 pb-5' style={{ maxWidth: "100%" }}>
            <ItemsCarousel
                gutter={20}
                activePosition={'center'}
                chevronWidth={40}
                disableSwipe={true}
                numberOfCards={screenChanged()}
                slidesToScroll={1}
                outsideChevron={false}
                showSlither={true}
                firstAndLastGutter={true}
                leftChevron={<button style={{ fontSize:'22px', fontWeight:'bold', fontFamily: 'Courier New' }} className='white-text opacity-90 rounded-circle btn btn-deep-purple px-3 ml-3'>{'<'}</button>}
                rightChevron={<button style={{ fontSize: '22px', fontWeight: 'bold', fontFamily: 'Courier New' }} className='white-text opacity-90 rounded-circle btn btn-deep-purple px-3 mr-3'>{'>'}</button>}
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
            >

                <Link className='card rounded' style={{ height: 275, width: 200, background: '#EEE' }} to='/' >
                    
                </Link>

                <Link className='card rounded' style={{ height: 275, width: 200, background: 'lightgrey' }} to='/' >
   
                </Link>

                <Link className='card rounded' style={{ height: 275, width: 200, background: '#EEE' }} to='/' >
         
                </Link>

                <Link className='card rounded' style={{ height: 275, width: 200, background: 'lightgrey' }} to='/' >
        
                </Link>

                <Link className='card rounded' style={{ height: 275, width: 200, background: '#EEE' }} to='/' >

                </Link>

                <Link className='card rounded' style={{ height: 275, width: 200, background: 'lightgrey' }} to='/' >

                </Link>

                <Link className='card rounded' style={{ height: 275, width: 200, background: '#EEE' }} to='/' >

                </Link>

                <Link className='card rounded' style={{ height: 275, width: 200, background: 'lightgrey' }} to='/' >

                </Link>
            </ItemsCarousel>
        </div>
    )
}

export default Carousel