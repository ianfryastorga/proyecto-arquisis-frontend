import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import { useLocation } from 'react-router-dom'
import FlightList from './FlightList';


const Flights = () => {
    const location = useLocation();
    let flights;
    if (location.state) {
        flights = location.state.flights;
    }

    return (
        <>
            <Navbar />
            <Search />
            <FlightList flights={flights} />
        </>
    )
}

export default Flights
