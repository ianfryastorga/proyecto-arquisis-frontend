import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from 'react-icons/lu'
import moment from 'moment'
import { IoRemoveOutline } from "react-icons/io5";
import { GrStatusDisabled, GrStatusCritical, GrStatusGood } from "react-icons/gr";
import { useAuth0 } from '@auth0/auth0-react'

const RequestList = ({ requests }) => {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return;
    }
    
    if (!requests || requests.length === 0) {
        const text = 'Busca vuelos para verlos aquí'
        return (
            <div className='reservations topPageMargin'>
                <div data-aos='fade-up' data-aos-duration='2000' className='flights grid container'>
                    <div data-aos='fade-up' data-aos-duration='1000' className='flightsContainer section'>
                        <div className='noFlight'>
                            <LuPlane size={120} style={{color: "lightGray" , strokeWidth: "2px"}}/>
                            <h3>{text}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div data-aos='fade-up' data-aos-duration='1000' className='reservations flex container'> 
            <ul data-aos='fade-up' data-aos-duration='500' className='reservationsContainer topPageMargin'>
                {requests.map((request) => (
                    <li className="singleReservation" key={request.id}>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Origen</div>
                            <div className='requestInfo'>{request.departureAirport}</div>
                        </div>
                        <div className='flightLogo'>
                            <IoRemoveOutline/><LuPlane /><IoRemoveOutline/>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Destino</div>
                            <div className='requestInfo'>{request.arrivalAirport}</div>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Fecha de salida</div>
                            <div className='requestInfo'>{moment(request.departureTime).format("DD/MM/YYYY HH:mm")}</div>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Estado</div>
                            {request.status === 'pending' && <GrStatusDisabled style={{color: "#f5d60e"}}/>}
                            {request.status === 'rejected' && <GrStatusCritical style={{color: "red"}}/>}
                            {request.status === 'accepted' && <GrStatusGood style={{color: "green"}}/>}
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RequestList