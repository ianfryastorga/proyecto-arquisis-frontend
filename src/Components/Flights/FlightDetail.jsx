import flightImage from '../../assets/flightDetails.jpg';
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const FlightDetail = ({ flight, availableSeats, onReserveTicket }) => {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    if (!flight) {
        return <p>Cargando datos del vuelo...</p>;
    }

    return (
        <div data-aos='fade-up' data-aos-duration='1000' className="flightContainer">
            <div data-aos='fade-up' data-aos-duration='500' className="flightInfo">
                <div className='infoContainer'>
                    <h2>Detalles de vuelo</h2>
                    <p>Salida: {flight.departureAirportName} - {flight.departureTime}</p>
                    <p>Llegada: {flight.arrivalAirportName} - {flight.arrivalTime}</p>
                    <p>Duración: {flight.duration} horas</p>
                    <p>Avión: {flight.airplane}</p>
                    <p>Aerolínea: {flight.airline}</p>
                    <p>Emisiones de carbono: {flight.carbonEmission?.this_flight || 'No disponible'}</p>
                    <p>Precio: {flight.price} {flight.currency}</p>
                    <p>Pasajes disponibles: {availableSeats}</p>
                    {flight.airlineLogo && (
                        <img src={flight.airlineLogo} alt="Logo de la aerolínea" />
                    )}
                </div>
                <button className="btn" onClick={onReserveTicket}>Reservar pasaje</button>
            </div>
            <div className="flightImage">
                <img src={flightImage} alt="Mapa de la ruta" />
            </div>
        </div>
    );
};

export default FlightDetail;
