import React from 'react';
import './FlightDetail.css';


const FlightDetail = ({ flight, availableSeats, onReserveTicket }) => {
  return (
    <div className="flight-detail">
      <p>Salida: {flight.departure_airport.name} - {flight.departure_airport.time}</p>
      <p>Llegada: {flight.arrival_airport.name} - {flight.arrival_airport.time}</p>
      <p>Duración: {flight.duration} horas</p>
      <p>Avión: {flight.airplane}</p>
      <p>Aerolínea: {flight.airline}</p>
      <p>Pasajes disponibles: {availableSeats}</p> {/* Mostrar la cantidad de pasajes disponibles */}
      <button onClick={onReserveTicket}>Reservar pasaje</button> {/* Botón para reservar un pasaje */}
    </div>
  );
};

export default FlightDetail;
