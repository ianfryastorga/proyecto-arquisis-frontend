import React, { useState } from 'react';
import FlightDetail from './FlightDetail';

const Flight = () => {
  const [availableSeats, setAvailableSeats] = useState(90); // Estado para la cantidad de pasajes disponibles

  const flightData = {
    departure_airport: {
      name: 'Santiago',
      id: 'SCL',
      time: '2024-04-17 10:00'
    },
    arrival_airport: {
      name: 'Madrid',
      id: 'MAD',
      time: '2024-04-17 18:00'
    },
    duration: 12,
    airplane: 'Boeing 737',
    airline: 'Example Airlines'
  };

  // Función para reservar un pasaje
  const handleReserveTicket = () => {
    setAvailableSeats(prevSeats => prevSeats - 1); 
    alert('¡Pasaje reservado!');
  };

  return (
    <div>
      <h1>Detalle del vuelo</h1>
      <FlightDetail flight={flightData} availableSeats={availableSeats} onReserveTicket={handleReserveTicket} />
    </div>
  );
};

export default Flight;

