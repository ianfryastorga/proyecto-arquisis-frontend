import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from 'react-icons/lu'
import moment from 'moment'
import { IoRemoveOutline } from "react-icons/io5";
import { GrStatusDisabled, GrStatusCritical, GrStatusGood } from "react-icons/gr";
import { useAuth0 } from '@auth0/auth0-react'
import FlightRoute from '../Flights/FlightRoute'

const RecommendationList = ({ recommendations }) => {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    if (!isLoading && !isAuthenticated) {
        loginWithRedirect();
        return;
    }
    
    if (!recommendations || recommendations.length === 0) {
        const text = 'No se encontraron recomendaciones'
        return (
            <div className='reservations'>
                <div data-aos='fade-up' data-aos-duration='2000' className='flights grid container'>
                    <div data-aos='fade-up' data-aos-duration='1000' className='flightsContainer'>
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
            <ul data-aos='fade-up' data-aos-duration='500' className='reservationsContainer'>
                {recommendations.map((recommendation) => (
                    <li className="singleReservation" key={recommendation.recommendation.id}>
                        <div className='reservationElement'>
                            < FlightRoute flight={recommendation.flight} />
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Costo</div>
                            <div className='requestInfo'>${recommendation.flight.price}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecommendationList