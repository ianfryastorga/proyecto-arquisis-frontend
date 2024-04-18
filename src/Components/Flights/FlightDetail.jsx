import './FlightDetail.css';

const FlightDetail = ({ flight, availableSeats, onReserveTicket }) => {
    if (!flight) {
        return <p>Cargando datos del vuelo...</p>;
    }

    /* return (
        <div className="flight-detail">
            <p>Salida: {flight.departure_airport.name} - {flight.departure_airport.time}</p>
            <p>Llegada: {flight.arrival_airport.name} - {flight.arrival_airport.time}</p>
            <p>Duración: {flight.duration} horas</p>
            <p>Avión: {flight.airplane}</p>
            <p>Aerolínea: {flight.airline}</p>
            <p>Emisiones de carbono: {flight.carbonEmission?.this_flight || 'No disponible'}</p>
            <p>Precio: {flight.price} {flight.currency}</p>
            <p>Pasajes disponibles: {availableSeats}</p>
            {flight.airlineLogo && (
                <img src={flight.airlineLogo} alt="Logo de la aerolínea" />
            )}
            <button onClick={onReserveTicket}>Reservar pasaje</button>
        </div>
    );
};
*/

    return (
        <div className="flight-detail">
            <p>Salida: {flight.DepartureAirport}</p>
            <p>Llegada: {flight.ArrivalAirport}</p>
            <p>Duración: {flight.Duration} horas</p>
            <p>Avión: {flight.Airplane}</p>
            <p>Aerolínea: {flight.Airline}</p>
            <p>Precio: {flight.Price}</p>
            <p>Pasajes disponibles: {availableSeats}</p>
            <button onClick={onReserveTicket}>Reservar pasaje</button>
        </div>
    );
};

export default FlightDetail;
