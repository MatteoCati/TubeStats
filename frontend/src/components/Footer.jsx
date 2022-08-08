import React from 'react'
import FooterImage from '../svgs/BottomBackground.svg'

const Footer = () => {
    return (
        <div style={{height: "250px", width: "100%", backgroundImage: `url('${FooterImage}')`, backgroundRepeat: 'no-repeat', backgroundSize: "cover",
        position: "absolute", bottom: "0px"}}>

        </div>
    )
}

export default Footer