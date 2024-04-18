import React, { useState } from 'react';
import FlightDetail from './FlightDetail';

const Flight = () => {
  const [availableSeats, setAvailableSeats] = useState(90); 

  const flightData = {
    flights: [
      {
        departure_airport: {
          name: "Aeropuerto Internacional de Los Ángeles",
          id: "LAX",
          time: "2024-04-11 17:20"
        },
        arrival_airport: {
          name: "Aeropuerto de París-Charles de Gaulle",
          id: "CDG",
          time: "2024-04-12 13:05"
        },
        duration: 645,
        airplane: "Airbus A350",
        airline: "Delta",
        airline_logo: "https://www.gstatic.com/flights/airline_logos/70px/DL.png"
      }
    ],
    price: 1901250,
    carbonEmission: {
      this_flight: 570000
    },
    airlineLogo: "https://www.gstatic.com/flights/airline_logos/70px/DL.png",
    currency: "CLP"
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
