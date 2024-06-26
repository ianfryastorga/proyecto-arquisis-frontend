import { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from 'react-icons/lu'
import moment from 'moment'
import ReservationModal from './ReservationModal'

const ReservationsList = ({token, requests }) => {
    const [reservationModal, setReservationModal] = useState(false);
    const [activeRequest, setRequest] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div data-aos='fade-up' data-aos-duration='1000' className='reservations flex column'>
            < ReservationModal token={token} request={activeRequest} modalOpen={reservationModal} setModalOpen={setReservationModal} /> 
            <ul data-aos='fade-up' data-aos-duration='500' className='reservationsContainer adminReservations'>
                {requests && requests.map((request) => (
                    <li className="singleReservation" key={request.id} onClick={() => {setRequest(request); setReservationModal(true);}}>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Origen</div>
                            <div className='requestInfo'>{request.departureAirportId}</div>
                        </div>
                        <div className='flightLogo'>
                            <LuPlane />
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Destino</div>
                            <div className='requestInfo'>{request.arrivalAirportId}</div>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Fecha de salida</div>
                            <div className='requestInfo'>{moment(request.departureTime).format("DD/MM/YYYY HH:mm")}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReservationsList