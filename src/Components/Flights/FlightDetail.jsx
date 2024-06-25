import flightImage from '../../assets/flightDetails.jpg';
import { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import { FaAngleLeft } from "react-icons/fa6";
import PassengerInput from './PassengerInfo';
import { useAuth0 } from '@auth0/auth0-react';
import FlightRoute from './FlightRoute';

const FlightDetail = ({ flight, availableSeats, groupSeats, onReserveTicket, passengers, setPassengers}) => {
    const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    const [max, setMax] = useState(4);

    const navigate = useNavigate();
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        if (user && user[`${process.env.AUTH0_NAMESPACE}/roles`].includes('admin')) {
            setMax(20);
        }
    }, [user]);
    
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
                    <p>Reservados del grupo: {groupSeats}</p>
                    <PassengerInput max={max} passengers={passengers} setPassengers={setPassengers} />
                </div>
                <button className="btn" onClick={() => {onReserveTicket(passengers, availableSeats, false)}}>Comprar pasajes</button>
                {user && !user[`${process.env.AUTH0_NAMESPACE}/roles`].includes('admin') && <button className="btn noBg" onClick={() => {onReserveTicket(passengers, groupSeats, true)}}>Comprar pasajes reservados del grupo</button>}
            </div>
            <div className="flightImage">
                <img src={flightImage} alt="Mapa de la ruta" />
            </div>
        </div>
    );
};

export default FlightDetail;
