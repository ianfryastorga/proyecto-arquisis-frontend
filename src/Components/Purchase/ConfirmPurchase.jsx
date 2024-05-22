import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import Aos from 'aos'
import 'aos/dist/aos.css'
import FlightRoute from '../Flights/FlightRoute';

function ConfirmPurchase() {
    const { id, request_id } = useParams();
    const [request, setRequest] = useState(null);
    const [flightData, setFlightData] = useState(null);
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const response = await axios.get(`${ process.env.BACKEND_URL }/requests/${request_id}`);
                setRequest(response.data);
            } catch (error) {
                console.error('Error fetching flight data:', error);
            }
        };
        fetchRequestData();
    }, [request_id]);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get(`${ process.env.BACKEND_URL }/flights/${id}`);
                setFlightData(response.data);
            } catch (error) {
                console.error('Error fetching flight data:', error);
            }
        };
        fetchFlightData();
    }, [id]);


    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return;
    }

    return (
        <div className='purchase'>
            {request && flightData &&
            <div data-aos='fade-up' data-aos-duration='1000' className="purchaseContainer">
                <form className='purchaseForm' action={request.url} method="POST">
                    <h2 className='purchaseTitle'>Confirmar compra</h2>
                    <input type="hidden" name="token_ws" value={request.depositToken} />
                    <FlightRoute flight={flightData}/> 
                    <div className='purchaseInfo'>
                        <div className='infoTitle'>Información de compra:</div>
                        <div className='infoContainer'>    
                            <div className='flex'>
                                <div>Pasajeros:  </div>
                                <div className='infoValue'>{request.quantity}</div>
                            </div>
                            <div className='flex'>
                                <div>Precio total:  </div>
                                <div className='infoValue'>${request.amount}</div>
                            </div>
                        </div>
                    </div>
                    <div className='center flex'>
                        <button className="btn" type="submit">Pagar</button>
                        <div className="btn noBg" onClick={() => {navigate("/flights")}}>Cancelar</div>
                    </div>
                </form>
            </div>}
        </div>
    )
}
  
export default ConfirmPurchase