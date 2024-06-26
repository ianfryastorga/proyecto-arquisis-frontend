import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RxCalendar } from 'react-icons/rx'
import FlightRoute from '../Flights/FlightRoute'
import moment from 'moment'
import axios from 'axios'

import Aos from 'aos'
import 'aos/dist/aos.css'

import { useAuth0 } from "@auth0/auth0-react";
import ReservationsList from './ReservationsList'
import OwnAuctionsList from './OwnAuctionsList'
import ProposalsList from './ProposalsList'
import OthersAuctionsList from './OthersAuctionsList'


const Landing = () => {
    const {user, isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [roles, setRoles] = useState([]);
    const [departure, setOrigin] = useState('')
    const [arrival, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [flights, setFlights] = useState([])
    const [reservations, setReservations] = useState([])
    const [proposals, setProposals] = useState([])
    const [ownAuctions, setAuctions] = useState([])
    const [othersAuctions, setOthers] = useState([])

    useEffect(() => {
        const getTokenAndRoles = async () => {
            try {
                const token = await getAccessTokenSilently();
                setToken(token);
                const namespace = 'user';
                setRoles(user[`${namespace}/roles`] || []);
            } catch (e) {
                console.error(e);
            }
        };
        getTokenAndRoles();
        if (!isLoading && isAuthenticated && token) {
            console.log('Token:', token);
            const decoded = jwtDecode(token);
            console.log('User:', user);
            console.log('Decoded:', decoded);
            console.log('Roles:', roles);
            if (!roles.includes('admin')) {
                return navigate('/');
            }
        }
    }, [isLoading, isAuthenticated, user, token, roles, getAccessTokenSilently, navigate]);

    useEffect(() => {
        if (token) {
            axios.get(`${ process.env.BACKEND_URL }/flights/booked`, { headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`}})
                .then(response => {
                    console.log("Reservas:", response.data);
                    setReservations(response.data);
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [token])

    useEffect(() => {
        if (token) {
            axios.get(`${ process.env.BACKEND_URL }/auctions/`, { headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`}})
                .then(response => {
                    console.log("Subastas propias:", response.data);
                    setAuctions(response.data);
                })
                .catch(error => {
                    console.error(error)
                });
        }
    }, [token])

    useEffect(() => {
        // Aquí debes establecer el token y las propias subastas (ownAuctions) en algún punto,
        // como en otro useEffect que obtenga esos valores

        if (token) {
            const fetchProposals = async () => {
                try {
                    const allProposals = [];
                    for (let auction of ownAuctions) {
                        console.log("Subasta activa:", auction);
                        const response = await axios.get(`${ process.env.BACKEND_URL }/proposals/auction/${auction.auctionId}`, { 
                            headers: {
                                "content-type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        });
                        console.log("Propuestas:", response.data);
                        allProposals.push(...response.data);
                    }
                    setProposals(allProposals);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchProposals();
        }
    }, [token, ownAuctions]);

    useEffect(() => {
        if (token) {
            axios.get(`${ process.env.BACKEND_URL }/auctions/others`, { headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`}})
                .then(response => {
                    console.log("Subastas de otros:", response.data);
                    setOthers(response.data);
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [token])

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
        return loginWithRedirect();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const queryParams = {}
        if (departure) queryParams.departure = departure
        if (arrival) queryParams.arrival = arrival
        if (moment(date, 'DD/MM/YYYY', true).isValid()) queryParams.date = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
        axios.get(`${ process.env.BACKEND_URL }/flights`, { params: queryParams })
            .then(response => {
                console.log(response.data);
                setFlights(response.data.flights);
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className='admin container'>
            <h2 data-aos='fade-up' data-aos-duration='2500' >Administración</h2>
            <div className="menus upCenter">
                <div className="singleMenu noPadding" data-aos='fade-up' data-aos-duration='2500'>
                    <div data-aos='fade-up' data-aos-duration='1000' className="sectionContainer">
                        <div data-aos='fade-up' data-aos-duration='500' className="searchInputs flex whiteBg adminSearch">
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
                                    <RxCalendar className='icon' />
                                </div>
                                <div className="texts">
                                    <h4>Fecha</h4>
                                    <input type="date" placeholder='Fecha de vuelo' onChange={(e) => {setDate(moment(e.target.value, 'YYYY-MM-DD').format('DD/MM/YYYY'))}} />
                                </div>
                            </div>
                            <button className='btn btnBlock flex' onClick={handleSubmit}>Buscar</button>
                        </div>
                    </div>
                    <div className='flights'>
                        {flights && flights.map((flight) => (
                            <li onClick={()=>{navigate("/flights/"+flight.id)}} className="singleFlight" key={flight.id}>
                                < FlightRoute flight={flight} />
                                <div className='price'>
                                    { flight.currency } { flight.price }
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
                <div className="flex column singleGap upCenter" data-aos='fade-up' data-aos-duration='2500'>
                    <div data-aos='fade-up' data-aos-duration='1000' className="sideMenu singlePadding">
                        <div className='title'>Reservas del grupo</div>
                        < ReservationsList token={token} requests={reservations} />
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1000' className="sideMenu singlePadding">
                        <div className='title'>Subastas Propias</div>
                        < OwnAuctionsList token={token} requests={ownAuctions} />
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1000' className="sideMenu singlePadding">
                        <div className='title'>Propuestas</div>
                        < ProposalsList token={token} requests={proposals} />
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1000' className="sideMenu singlePadding">
                        <div className='title'>Subastas disponibles</div>
                        < OthersAuctionsList token={token} requests={othersAuctions} ownReservations={reservations} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;

