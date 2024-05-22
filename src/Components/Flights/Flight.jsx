import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FlightDetail from './FlightDetail';
import { useAuth0 } from "@auth0/auth0-react";
import ReservationMessage from './ReservationMessage';
import moment from 'moment-timezone';

const Flight = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [flightData, setFlightData] = useState(null);
    const [availableSeats, setAvailableSeats] = useState(0);
    const { user } = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [passengers, setPassengers] = useState(0);
    const [ipAddress, setIPAddress] = useState('');

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

    useEffect(() => {
        axios.get('https://geolocation-db.com/json/')
            .then(data => {
                setIPAddress(data.data.IPv4)
            })
            .catch(error => console.log(error))
    }, [])
    
    const handleReserveTicket = (quantity) => {
        if (quantity > availableSeats || quantity < 1 || quantity > 4) {
            setMessage('Cantidad de asientos no es válida');
            setModalOpen(true);
            return;
        }
        axios.post(`${ process.env.BACKEND_URL }/requests`,  {
            "requestId":"uuid",
            "groupId":"11",
            "departureAirport":flightData.departureAirportId,
            "arrivalAirport": flightData.arrivalAirportId,
            "departureTime": flightData.departureTime,
            "datetime": moment().tz("America/Santiago").format("YYYY-MM-DD HH:mm:ss"),
            "depositToken":"",
            "quantity":passengers,
            "seller":0,
            "username": user.name,
            "ipAddress": ipAddress,
            "price": flightData.price,
        }).then(response => {
            console.log(response.data);
            if (response.data?.url && response.data?.depositToken) {
                navigate(`/flights/${id}/${response.data.requestId}/confirm-purchase`)
            }
            else {
                setMessage('Error al generar la reserva');
                setModalOpen(true);
            }
        }).catch(error => {
            console.error(error)
        });
    };

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
