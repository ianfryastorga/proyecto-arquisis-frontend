import flightImage from '../../assets/flightDetails.jpg';
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa6";
import PassengerInput from './PassengerInfo';
import { useAuth0 } from '@auth0/auth0-react';

const FlightDetail = ({ flight, availableSeats, onReserveTicket, passengers, setPassengers}) => {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return;
    }
    
    if (!flight) {
        return <p>Cargando datos del vuelo...</p>;
    }


    return (
        <div data-aos='fade-up' data-aos-duration='1000' className="flightContainer">
            <div data-aos='fade-up' data-aos-duration='500' className="flightInfo">
                <div className='back'>
                    <button className='btnBack' onClick={() => navigate(-1)}><FaAngleLeft />Regresar</button>
                </div>
                <div className='infoContainer'>
                    <h2>Detalles del vuelo</h2>
                    <div className='price'>
                        { flight.currency } { flight.price }
                    </div>
                    <h4> Ruta </h4>
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
                    <h4> Operado por </h4>
                    <div className='airlineInfo'>
                        <div>{flight.airline} </div>
                        {flight.airlineLogo && (
                            <img src={flight.airlineLogo} alt="Logo de la aerolínea" />
                        )}
                    </div>
                    <h4> Pasajes </h4>
                    <p>Disponibles: {availableSeats}</p>
                    <PassengerInput passengers={passengers} setPassengers={setPassengers} />
                </div>
                <button className="btn" onClick={() => {onReserveTicket(passengers)}}>Reservar pasajes</button>
            </div>
            <div className="flightImage">
                <img src={flightImage} alt="Mapa de la ruta" />
            </div>
        </div>
    );
};

export default FlightDetail;
