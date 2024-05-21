import flightImage from '../../assets/flightDetails.jpg';
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa6";
import PassengerInput from './PassengerInfo';
import { useAuth0 } from '@auth0/auth0-react';
import FlightRoute from './FlightRoute';

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
                    < FlightRoute flight={flight} />
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
