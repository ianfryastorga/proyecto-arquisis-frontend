import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import { LuPlane } from "react-icons/lu";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import axios from 'axios'
import FlightRoute from '../Flights/FlightRoute';
import { useAuth0 } from "@auth0/auth0-react"; 


const FlightList = (props) => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const flights = props.flights;
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const accessToken = getAccessTokenSilently();
    
    if (!flights || flights.length === 0) {
        let text;
        if (!flights) {
            text = 'Busca vuelos para verlos aquí'
        }
        else {
            text = 'No se encontraron vuelos'
        }
        return (
            <div data-aos='fade-up' data-aos-duration='2000' className='flights grid container'>
                <div data-aos='fade-up' data-aos-duration='1000' className='flightsContainer'>
                    <div className='noFlight'>
                        <LuPlane size={120} style={{color: "lightGray" , strokeWidth: "2px"}}/>
                        <h3>{text}</h3>
                    </div>
                </div>
            </div>
        )
    }
    const page = props.page;
    const count = props.count;
    const totalCount = props.totalCount;
    const params = props.params;
    let quantity = props.quantity;
    if (!quantity) {
        quantity = 0
    }

    const handlePreviousPage = () => {
        params.page = page - 1
        axios.get(`${ process.env.BACKEND_URL }/flights`, { params: params }, { headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }}).then(response => {
            navigate(
                '/flights',
                {
                    state: {
                        params: params,
                        flights: response.data.flights,
                        page: response.data.page,
                        count: response.data.count,
                        totalCount: response.data.totalCount
                    }
                }
            )
        })
        .catch(error => {
            console.error(error)
        })
    }
    const handleNextPage = () => {
        params.page = page + 1
        axios.get(`${ process.env.BACKEND_URL }/flights`, { params: params })
            .then(response => {
                navigate(
                    '/flights',
                    {
                        state: {
                            params: params,
                            flights: response.data.flights,
                            page: response.data.page,
                            count: response.data.count,
                            totalCount: response.data.totalCount
                        }
                    }
                )
            })
            .catch(error => {
                console.error(error)
            })
    }

    const previousButton = page > 1? (
        <button className='pageButton'>
            <FaAngleLeft onClick={handlePreviousPage}/>
        </button>
    ) : null

    const nextButton = page < Math.ceil(totalCount/count)? (
        <button className='pageButton'>
            <FaAngleRight onClick={handleNextPage}/>
        </button>
    ) : null

    return (
        <div data-aos='fade-up' data-aos-duration='1000' className='flights container'> 
            <ul data-aos='fade-up' data-aos-duration='500' className='flightsContainer'>
                <div className='flightsPage flex'>
                    <h5>Página&nbsp;</h5>
                    {previousButton}
                    <h5> {page}</h5>
                    {nextButton}
                    <h5>&nbsp;de {Math.ceil(totalCount/count)}</h5>
                </div>
                {flights.map((flight) => (
                    flight.quantity > quantity?(<li onClick={()=>{navigate("/flights/"+flight.id)}} className="singleFlight" key={flight.id}>
                        < FlightRoute flight={flight} />
                        <div className='price'>
                            { flight.currency } { flight.price }
                        </div>
                    </li>):null
                ))}
            </ul>
        </div>
    )
}

export default FlightList