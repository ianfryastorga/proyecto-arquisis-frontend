import { useEffect, useState } from "react";
import Modal from "react-modal";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import moment from "moment";
import PassengerInput from "../Flights/PassengerInfo";

function OwnAuctionModal({request, modalOpen, setModalOpen} ) {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        request?(<div className="reservationMessage">
            <Modal 
                className="modal"
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                ariaHideApp={false}
            >
                <div data-aos='zoom-in' data-aos-duration='500' className="adminModalContent">
                    <div className='modalTitle'> Detalles de la subasta </div>
                    <div className="singlePadding flex justifyEvenly">
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
                            <div className='requestTitle'>Asientos subastados</div>
                            <div className='requestInfo'>{request.quantity}</div>
                        </div>
                    </div>
                    <div className="flex justifyEvenly">
                        <button className="btn noBg" onClick={() => setModalOpen(false)}>Cerrar</button>
                    </div>
                </div>
            </Modal>
        </div>):null
    );
}

export default OwnAuctionModal;