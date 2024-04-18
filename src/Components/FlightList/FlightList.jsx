import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'

const FlightList = (props) => {
    const navigate = useNavigate();
    const flights = props.flights;
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    console.log(flights);
    
    if (!flights || flights.length === 0) {
        return null
    }


    return (
        <div className='flights flex container'> 
            <ul className='flightsContainer'>
                {flights.map((flight) => (
                    <li onClick={()=>{navigate("/flights/"+flight.Id)}} className="singleFlight" key={flight.Id}>
                        <div className='flightDetails'>
                            <h4>{flight.DepartureAirport} / {flight.ArrivalAirport}</h4>
                            <p>Departure: {flight.DepartureTime}</p>
                            <p>Arrival: {flight.ArrivalTime}</p>
                            <p>Price: ${flight.Price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FlightList