import { useState, useEffect } from 'react';
import ReservationList from './ReservationList';
import { useAuth0 } from "@auth0/auth0-react"; 
import axios from 'axios';


const Reservations = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            axios.get(`${process.env.BACKEND_URL}/requests`, { params: { username: user?.name } })
                .then(response => {
                    setRequests(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user?.name, isAuthenticated, isLoading]);

    return (
        <>
            <ReservationList requests={requests}/>
        </>
    )
}

export default Reservations;
