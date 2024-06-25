import { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from 'react-icons/lu'
import moment from 'moment'
import OwnAuctionModal from './OwnAuctionModal';

const OwnAuctionsList = ({ requests }) => {
    const [modal, setModal] = useState(false);
    const [activeRequest, setRequest] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div data-aos='fade-up' data-aos-duration='1000' className='reservations flex column'> 
            < OwnAuctionModal request={activeRequest} modalOpen={modal} setModalOpen={setModal} />
            <ul data-aos='fade-up' data-aos-duration='500' className='reservationsContainer adminReservations'>
                {requests.map((request) => (
                    <li className="singleReservation" key={request.id} onClick={() => {setRequest(request); setModal(true);}}>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OwnAuctionsList