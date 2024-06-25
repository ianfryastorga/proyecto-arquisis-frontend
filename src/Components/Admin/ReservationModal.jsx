import { useEffect, useState } from "react";
import Modal from "react-modal";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import moment from "moment";
import PassengerInput from "../Flights/PassengerInfo";
import axios from "axios";

function ReservationModal({request, modalOpen, setModalOpen} ) {
    const [passenger, setPassenger] = useState(0);

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const handleCreateSubmission = () => {
        if (passenger > request.booked|| passenger < 1) {
            return;
        }
        console.log(request);
        axios.post(`${ process.env.BACKEND_URL }/auctions/submit`, {
            "departureAirport": request.departureAirportId,
            "arrivalAirport": request.arrivalAirportId,
            "departureTime": request.departureTime,
            "airline": request.airline,
            "quantity": passenger,
            "groupId": 11
        }).then(response => {
            console.log(response.data);
            setModalOpen(false);
        }).catch(error => {
            console.error(error)
        });
    };

    return (
        request?(<div className="reservationMessage">
            <Modal 
                className="modal"
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                ariaHideApp={false}
            >
                <div data-aos='zoom-in' data-aos-duration='500' className="adminModalContent">
                    <div className='modalTitle'> Detalles de reserva </div>
                    <div className="singlePadding flex justifyEvenly">
                        <div className='reservationElement'>
                            <div className='requestTitle'>Origen</div>
                            <div className='requestInfo'>{request.departureAirportId}</div>
                        </div>
                        <div className='flightLogo'>
                            <IoRemoveOutline/><LuPlane /><IoRemoveOutline/>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Destino</div>
                            <div className='requestInfo'>{request.arrivalAirportId}</div>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Fecha de salida</div>
                            <div className='requestInfo'>{moment(request.departureTime).format("DD/MM/YYYY HH:mm")}</div>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Asientos disponibles</div>
                            <div className='requestInfo'>{request.booked}</div>
                        </div>
                    </div>
                    <div className="auction">
                        <div className='requestTitle'>¿ Desea crear una subasta con los asientos disponibles?</div>
                        < PassengerInput max={request.booked} passengers={passenger} setPassengers={setPassenger} />
                    </div>
                    <div className="flex justifyEvenly">
                        <button className="btn" onClick={() => handleCreateSubmission()}>Crear Subasta</button>
                        <button className="btn noBg" onClick={() => setModalOpen(false)}>Cerrar</button>
                    </div>
                </div>
            </Modal>
        </div>):null
    );
}

export default ReservationModal;