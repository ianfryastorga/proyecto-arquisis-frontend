import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import { LuPlane } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import moment from 'moment'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import axios from 'axios'

const FlightList = (props) => {
    const navigate = useNavigate();
    const flights = props.flights;
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])
    
    if (!flights || flights.length === 0) {
        let text;
        if (!flights) {
            text = 'Busca vuelos para verlos aquí'
        }
        else {
            text = 'No se encontraron vuelos'
        }
        return (
            <div data-aos='fade-up' data-aos-duration='2000' className='flights grid container'>
                <div data-aos='fade-up' data-aos-duration='1000' className='flightsContainer'>
                    <div className='noFlight'>
                        <LuPlane size={120} style={{color: "lightGray" , strokeWidth: "2px"}}/>
                        <h3>{text}</h3>
                    </div>
                </div>
            </div>
        )
    }
    const page = props.page;
    const count = props.count;
    const totalCount = props.totalCount;
    const params = props.params;
    let quantity = props.quantity;
    if (!quantity) {
        quantity = 0
    }

    const handlePreviousPage = () => {
        params.page = page - 1
        axios.get(`${ process.env.BACKEND_URL }/flights`, { params: params })
            .then(response => {
                navigate(
                    '/flights',
                    {
                        state: {
                            params: params,
                            flights: response.data.flights,
                            page: response.data.page,
                            count: response.data.count,
                            totalCount: response.data.totalCount
                        }
                    }
                )
            })
            .catch(error => {
                console.error(error)
            })
    }
    const handleNextPage = () => {
        params.page = page + 1
        axios.get(`${ process.env.BACKEND_URL }/flights`, { params: params })
            .then(response => {
                navigate(
                    '/flights',
                    {
                        state: {
                            params: params,
                            flights: response.data.flights,
                            page: response.data.page,
                            count: response.data.count,
                            totalCount: response.data.totalCount
                        }
                    }
                )
            })
            .catch(error => {
                console.error(error)
            })
    }

    const previousButton = page > 1? (
        <button className='pageButton'>
            <FaAngleLeft onClick={handlePreviousPage}/>
        </button>
    ) : null

    const nextButton = page < Math.ceil(totalCount/count)? (
        <button className='pageButton'>
            <FaAngleRight onClick={handleNextPage}/>
        </button>
    ) : null

    console.log(flights)

    return (
        <div data-aos='fade-up' data-aos-duration='1000' className='flights container'> 
            <ul data-aos='fade-up' data-aos-duration='500' className='flightsContainer'>
                <div className='flightsPage flex'>
                    <h5>Página&nbsp;</h5>
                    {previousButton}
                    <h5> {page}</h5>
                    {nextButton}
                    <h5>&nbsp;de {Math.ceil(totalCount/count)}</h5>
                </div>
                {flights.map((flight) => (
                    flight.quantity > quantity?(<li onClick={()=>{navigate("/flights/"+flight.id)}} className="singleFlight" key={flight.id}>
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
                        <div className='price'>
                            { flight.currency } { flight.price }
                        </div>
                    </li>):null
                ))}
            </ul>
        </div>
    )
}

export default FlightList