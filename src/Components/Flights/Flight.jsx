import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FlightDetail from './FlightDetail';

const Flight = () => {
    const { id } = useParams();
    const [flightData, setFlightData] = useState(null);
    const [availableSeats, setAvailableSeats] = useState(90);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/flights/${id}`);
                setFlightData(response.data.flights[0]);
            } catch (error) {
                console.error('Error fetching flight data:', error);
            }
        };
        fetchFlightData();
    }, [id]);

    const handleReserveTicket = () => {
        setAvailableSeats(prevSeats => prevSeats - 1);
        alert('¡Pasaje reservado!');
    };

    return (
        <div>
            <h1>Detalle del vuelo</h1>
            {flightData ? (
                <FlightDetail
                    flight={flightData}
                    availableSeats={availableSeats}
                    onReserveTicket={handleReserveTicket}
                />
            ) : (
                <p>Cargando datos del vuelo...</p>
            )}
        </div>
    );
};

export default Flight;
