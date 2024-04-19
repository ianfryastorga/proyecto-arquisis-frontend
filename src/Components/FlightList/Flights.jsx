import Search from '../Search/Search'
import { useLocation } from 'react-router-dom'
import FlightList from './FlightList';
import { useAuth0 } from "@auth0/auth0-react"; 


const Flights = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    if (!isLoading && !isAuthenticated) {
        return loginWithRedirect();
    }
    const location = useLocation();
    let flights;
    if (location.state) {
        flights = location.state.flights;
    }

    return (
        <>
            <Search />
            <FlightList flights={flights} />
        </>
    )
}

export default Flights
