import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FlightDetail from './FlightDetail';
import { useAuth0 } from "@auth0/auth0-react";

const Flight = () => {
    const { id } = useParams();
    const [flightData, setFlightData] = useState(null);
    const [availableSeats, setAvailableSeats] = useState(90);
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/flights/${id}`);
                setFlightData(response.data);
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
    
    if (!isLoading && !isAuthenticated) {
        return loginWithRedirect();
    }

    return (
        <div className='flightDetail'>
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
