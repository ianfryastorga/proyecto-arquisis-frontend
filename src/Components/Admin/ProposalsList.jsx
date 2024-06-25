import { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { LuPlane } from 'react-icons/lu'
import moment from 'moment'
import ProposalModal from './ProposalModal'

const ProposalsList = ({ requests }) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div data-aos='fade-up' data-aos-duration='1000' className='reservations flex column'> 
            <ProposalModal modalOpen={modal} setModalOpen={setModal} />
            <ul data-aos='fade-up' data-aos-duration='500' className='reservationsContainer adminReservations'>
                {requests.map((request) => (
                    <li className="singleReservation" key={request.id}>
                        <button className='btn'>Ver detalles</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProposalsList