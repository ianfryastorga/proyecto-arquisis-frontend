import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FlightDetail from './FlightDetail';
import { useAuth0 } from "@auth0/auth0-react";
import ReservationMessage from './ReservationMessage';

const Flight = () => {
    const { id } = useParams();
    const [flightData, setFlightData] = useState(null);
    const [availableSeats, setAvailableSeats] = useState(0);
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [passengers, setPassengers] = useState(0);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get(`${ process.env.BACKEND_URL }/flights/${id}`);
                setFlightData(response.data);
                setAvailableSeats(response.data.quantity);
                if (response.data.quantity < 0) {
                    setAvailableSeats(0);
                }
            } catch (error) {
                console.error('Error fetching flight data:', error);
            }
        };
        fetchFlightData();
    }, [id]);
    
    const handleReserveTicket = (quantity) => {
        if (quantity > availableSeats || quantity < 1 || quantity > 4) {
            setMessage('Cantidad de asientos no es válida');
            setModalOpen(true);
            return;
        }
        axios.post(`${ process.env.BACKEND_URL }/requests`,  {
            requestId:"uuid",
            groupId:"11",
            departureAirport: flightData.departureAirportId,
            arrivalAirport: flightData.arrivalAirportId,
            departureTime: flightData.departureTime,
            datetime: "actual",
            depositToken: "",
            quantity: passengers,
            seller: 0
        }).then(response => {
            console.log(response.data);
            setMessage('Reserva realizada');
            setModalOpen(true);
            setAvailableSeats(prevSeats => prevSeats - quantity);
        }).catch(error => {
            console.error(error)
        });
    };
    
    if (!isLoading && !isAuthenticated) {
        return loginWithRedirect();
    }

    return (
        <div className='flightDetail'>
            < ReservationMessage message={message} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            {flightData ? (
                <FlightDetail
                    flight={flightData}
                    availableSeats={availableSeats}
                    onReserveTicket={handleReserveTicket}
                    passengers={passengers}
                    setPassengers={setPassengers}
                />
            ) : (
                <p>Cargando datos del vuelo...</p>
            )}
        </div>
    );
};

export default Flight;
