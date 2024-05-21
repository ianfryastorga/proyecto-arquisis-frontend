import { LuPlane } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import moment from 'moment'

const FlightRoute = ({ flight }) => {
    return ( 
        <div className='flightDetails grid'>
            <div className='flightAirportInfo'>
                <h5>{flight.departureAirportId} - {flight.departureAirportName}</h5>
                <h6>{moment(flight.departureTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</h6>
                <h6>{moment(flight.departureTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</h6>
            </div>
            <div className='middleList'>
                <div className='flightLogo'>
                    <IoRemoveOutline/><LuPlane /><IoRemoveOutline/>
                </div>
                <div className='flightDuration'>
                    { flight.duration > 60 ? Math.floor(flight.duration / 60) + 'h ' + flight.duration % 60 + 'm' : flight.duration + 'm'}
                </div>
            </div>
            <div className='flightAirportInfo'>
                <h5>{flight.arrivalAirportId} - {flight.arrivalAirportName}</h5>
                <h6>{moment(flight.arrivalTime, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</h6>
                <h6>{moment(flight.arrivalTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</h6>
            </div>
        </div>
    )
}

export default FlightRoute