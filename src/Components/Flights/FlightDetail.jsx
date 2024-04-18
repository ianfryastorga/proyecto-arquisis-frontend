import React from 'react';
import './FlightDetail.css';

const FlightDetail = ({ flight, availableSeats, onReserveTicket }) => {
  return (
    <div className="flight-detail">
      <p>Salida: {flight.flights[0].departure_airport.name} - {flight.flights[0].departure_airport.time}</p>
      <p>Llegada: {flight.flights[0].arrival_airport.name} - {flight.flights[0].arrival_airport.time}</p>
      <p>Duración: {flight.flights[0].duration} horas</p>
      <p>Avión: {flight.flights[0].airplane}</p>
      <p>Aerolínea: {flight.flights[0].airline}</p>
      <p>Emisiones de carbono: {flight.carbonEmission.this_flight !== null ? flight.carbonEmission.this_flight : 'No disponible'}</p>
      <p>Precio: {flight.price} {flight.currency}</p>
      <p>Pasajes disponibles: {availableSeats}</p>
      {flight.airlineLogo && (
        <img src={flight.airlineLogo} alt="Logo de la aerolínea" />
      )}
      <button onClick={onReserveTicket}>Reservar pasaje</button>
    </div>
  );
};

export default FlightDetail;
