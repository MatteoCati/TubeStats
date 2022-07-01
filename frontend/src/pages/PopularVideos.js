
import { useState } from "react"
import "./PopularVideos.css"

const PopularVideos = () => {
    const [country, setCountry] = useState(["IT", "Italy"])
    const countryList = require('./countryCode.json')

    const handleChange = (event) => {
        console.log(event.target.value)
        setCountry(JSON.parse(event.target.value));
      };
    
    return (
        <div className="pages">
            <div className="titleContainer"><p className="subTitle">Popular Videos in <span style={{textDecoration: "underline"}}>{country[1]}</span></p> </div>
            <select onChange={handleChange} value={JSON.stringify(country)} >
                {countryList.map(l => 
                    <option key={l[0]} value={JSON.stringify(l)}>{l[1]}</option>)}
            </select>
        </div>
    )
}

export default PopularVideos