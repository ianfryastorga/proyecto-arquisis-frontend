import { useEffect, useState } from "react";
import Modal from "react-modal";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import moment from "moment";
import axios from "axios";

function ProposalModal({token, request, modalOpen, setModalOpen} ) {
    const [auction, setAuction] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        if (request) {
            axios.get(`${ process.env.BACKEND_URL }/auctions/${request.auctionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data);
                setAuction(response.data);
            }).catch(error => {
                console.error(error)
            });
        }
    }, [request, token])

    const handleProposal = (value) => {
        if (request) {
            axios.post(`${ process.env.BACKEND_URL }/proposals/submitResponse`, {
                "auctionId": request.auctionId,
                "proposalId": request.proposalId,
                "departureAirport": request.departureAirport,
                "arrivalAirport": request.arrivalAirport,
                "departureTime": request.departureTime,
                "airline": request.airline,
                "quantity": request.quantity,
                "groupId": request.groupId,
                "type": value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data);
                setModalOpen(false);
            }).catch(error => {
                setMessage('Error al responder propuesta');
                console.error(error)
            });
        }
    }

    return (
        ( request && auction )?(<div className="reservationMessage">
            <Modal 
                className="modal"
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                ariaHideApp={false}
            >
                <div data-aos='zoom-in' data-aos-duration='500' className="adminModalContent">
                    <div className='modalTitle'> Detalles de Propuesta </div>
                    <div className="singlePadding flex paddingLeft"> Mi subasta: </div>
                    <div className="singlePadding flex justifyEvenly">
                        <div className='reservationElement'>
                            <div className='requestTitle'>Origen</div>
                            <div className='requestInfo'>{auction.departureAirport}</div>
                        </div>
                        <div className='flightLogo'>
                            <IoRemoveOutline/><LuPlane /><IoRemoveOutline/>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Destino</div>
                            <div className='requestInfo'>{auction.arrivalAirport}</div>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Fecha de salida</div>
                            <div className='requestInfo'>{moment(auction.departureTime).format("DD/MM/YYYY HH:mm")}</div>
                        </div>
                        <div className='reservationElement'>
                            <div className='requestTitle'>Asientos disponibles</div>
                            <div className='requestInfo'>{auction.quantity}</div>
                        </div>
                    </div>
                    <div className="singlePadding flex paddingLeft"> Su propuesta: </div>
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
                            <div className='requestTitle'>Asientos disponibles</div>
                            <div className='requestInfo'>{request.quantity}</div>
                        </div>
                    </div>
                    <div>{message}</div>
                    <div className="flex justifyEvenly">
                        <button className="btn" onClick={() => handleProposal("acceptance")}>Aceptar</button>
                        <button className="btn noBg" onClick={() => handleProposal("rejection")}>Rechazar</button>
                        <button className="btn noBg" onClick={() => setModalOpen(false)}>Cerrar</button>
                    </div>
                </div>
            </Modal>
        </div>):null
    );
}

export default ProposalModal