import { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from 'react-icons/lu'
import moment from 'moment'
import OthersAuctionModal from './OthersAuctionModal'

const OthersAuctionsList = ({ requests }) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className='reservations flex column'> 
            < OthersAuctionModal modalOpen={modal} setModalOpen={setModal} />
            <ul className='reservationsContainer adminReservations'>
                {requests.map((request) => (
                    <li className="singleReservation" key={request.id} onClick={() => {setModal(true)}}>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Origen</div>
                            <div className='requestInfo'>{request.departureAirport}</div>
                        </div>
                        <div className='flightLogo'>
                            <LuPlane />
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
                            <div className='requestTitle'>Cantidad</div>
                            <div className='requestInfo'>{request.quantity}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OthersAuctionsList