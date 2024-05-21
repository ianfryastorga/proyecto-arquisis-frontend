import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import Aos from 'aos'
import 'aos/dist/aos.css'

function ConfirmPurchase() {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
   
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const response = await axios.get(`${ process.env.BACKEND_URL }/requests/${id}`);
                setRequest(response.data);
            } catch (error) {
                console.error('Error fetching flight data:', error);
            }
        };
        fetchRequestData();
    }, [id]);



    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return;
    }

    const title = request?.departureAirport + ' - ' + request?.arrivalAirport;

    return (
        <div className='flightDetail'>
            {request &&
            <div data-aos='fade-up' data-aos-duration='1000' className="flightContainer">
                <p className="text-6xl text-center font-extrabold text-sky-500">Confirmar compra</p>
                <form className="flex flex-col gap-5 border rounded-xl shadow-[0_0px_8px_#b4b4b4] p-6 mt-5" action={request.url} method="POST">
                    <input type="hidden" name="token_ws" value={request.depositToken} />
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold">{title}</p> 
                        <p>Cantidad: ${request.amount}</p>
                    </div>
                    <button className="btn" type="submit">Pagar</button>
                    <button className="btn noBg">Cancelar</button>
                </form>
            </div>}
        </div>
    )
}
  
export default ConfirmPurchase