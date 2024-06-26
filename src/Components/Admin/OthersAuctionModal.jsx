import { useEffect, useState } from "react";
import Modal from "react-modal";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import moment from "moment";
import PassengerInput from "../Flights/PassengerInfo";
import axios from "axios";

function OtherAuctionModal({token, ownReservations, request, modalOpen, setModalOpen} ) {
    const [passenger, setPassenger] = useState(0);
    const [proposal, setProposal] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        if (ownReservations.length == 1) {
            setProposal(ownReservations[0]);
        }
    }, [ownReservations])

    const handleCreateProposal = () => {
        console.log(request)
        if (!proposal || passenger == 0) {
            setMessage('Seleccione una reserva y cantidad válidas');
            return;
        }
        console.log(proposal);
        axios.post(`${ process.env.BACKEND_URL }/proposals/submit`, {
            "auctionId": request.auctionId,
            "departureAirport": proposal.departureAirportId,
            "arrivalAirport": proposal.arrivalAirportId,
            "departureTime": proposal.departureTime,
            "airline": proposal.airline,
            "quantity": passenger,
            "groupId": 11
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data);
            setModalOpen(false);
        }).catch(error => {
            setMessage('Error al crear propuesta');
            console.error(error)
        });

    };

    const handleSelectChange = (e) => {
        const selectedReservation = JSON.parse(e.target.value);
        setProposal(selectedReservation);
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
                    <div className='modalTitle'> Detalles de subasta </div>
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
                    <div className="auction">
                        <div className='requestTitle'>¿Desea proponer un intercambio por estos asientos?</div>
                        <div className="flex justifyEvenly bottomPageMargin">
                            <div>
                                <div className="requestInfo">Seleccione una de sus reservas:</div>
                                <select
                                    className="dropdown"
                                    onChange={handleSelectChange}
                                >
                                    <option value="" disabled>Seleccione una reserva</option>
                                    {ownReservations.map(reservation => (
                                        <option key={reservation.id} value={JSON.stringify(reservation)} onClick={() => console.log(reservation)}>
                                            {reservation.departureAirportId} a {reservation.arrivalAirportId} - {moment(reservation.departureTime).format("DD/MM/YYYY HH:mm")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className="requestInfo">Cantidad:</div>
                                < PassengerInput max={proposal.booked} passengers={passenger} setPassengers={setPassenger} />
                            </div>
                        </div>
                    </div>
                    <div>{message}</div>
                    <div className="flex justifyEvenly">
                        <button className="btn" onClick={() => handleCreateProposal()}>Proponer intercambio</button>
                        <button className="btn noBg" onClick={() => {setMessage("");setModalOpen(false)}}>Cerrar</button>
                    </div>
                </div>
            </Modal>
        </div>):null
    );
}

export default OtherAuctionModal