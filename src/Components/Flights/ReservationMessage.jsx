import { useEffect } from "react";
import Modal from "react-modal";
import Aos from 'aos'
import 'aos/dist/aos.css'

function ReservationMessage({ message, modalOpen, setModalOpen} ) {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className="reservationMessage">
            <Modal 
                className="modal"
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                ariaHideApp={false}
            >
                <div data-aos='zoom-in' data-aos-duration='500' className="modalContent">
                    <div className="message"> {message}</div>
                    <button className="btn noBg" onClick={() => setModalOpen(false)}>Cerrar</button>
                </div>
            </Modal>
        </div>
    );
}

export default ReservationMessage;