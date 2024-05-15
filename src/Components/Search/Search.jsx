import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { RxCalendar } from 'react-icons/rx'
import axios from 'axios'
import moment from 'moment'

import Aos from 'aos'
import 'aos/dist/aos.css'

function Search() {
    const navigate = useNavigate()
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const [departure, setOrigin] = useState('')
    const [arrival, setDestination] = useState('')
    const [passengers, setPassengers] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const queryParams = {}
        if (departure) queryParams.departure = departure
        if (arrival) queryParams.arrival = arrival
        if (moment(date, 'DD/MM/YYYY', true).isValid()) queryParams.date = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
        axios.get(`${ process.env.BACKEND_URL }/flights`, { params: queryParams })
            .then(response => {
                console.log(response.data)
                navigate(
                    '/flights',
                    {
                        state: {
                            params: queryParams,
                            flights: response.data.flights,
                            page: response.data.page,
                            count: response.data.count,
                            totalCount: response.data.totalCount,
                            quantity: passengers
                        }
                    }
                )
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="search section container">
            <div data-aos='fade-up' data-aos-duration='1000' className="sectionContainer">

                <div data-aos='fade-up' data-aos-duration='500' className="searchInputs flex">
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <HiOutlineLocationMarker className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Origen</h4>
                            <input type="text" placeholder='Código de origen' onChange={(e) => setOrigin(e.target.value.toUpperCase())} />
                        </div>
                    </div>
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <HiOutlineLocationMarker className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Destino</h4>
                            <input type="text" placeholder='Código de destino' onChange={(e) => setDestination(e.target.value.toUpperCase())} />
                        </div>
                    </div>
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RiAccountPinCircleLine className='icon' />
                        </div>
                        <div className="texts">
                            <h4>Cantidad</h4>
                            <input type="text" placeholder='Cantidad de pasajeros' onChange={(e) => setPassengers(e.target.value)} />
                        </div>
                    </div>

                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RxCalendar className='icon' />
                        </div>
                        <div className="texts">
                            <h4>Fecha</h4>
                            <input type="date" placeholder='Fecha de vuelo' onChange={(e) => {setDate(moment(e.target.value, 'YYYY-MM-DD').format('DD/MM/YYYY'))}} />
                        </div>
                    </div>
                    <button className='btn btnBlock flex' onClick={handleSubmit}>Search Flights</button>
                </div>
            </div>
        </div>
    )
}

export default Search