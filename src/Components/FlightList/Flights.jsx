import Search from '../Search/Search'
import { useLocation } from 'react-router-dom'
import FlightList from './FlightList';
import { useAuth0 } from "@auth0/auth0-react"; 


const Flights = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const location = useLocation();
    if (!isLoading && !isAuthenticated) {
        return loginWithRedirect();
    }
    let flights;
    let page;
    let count;
    let totalCount;
    let params;
    let quantity;
    if (location.state) {
        flights = location.state.flights;
        page = location.state.page;
        count = location.state.count;
        totalCount = location.state.totalCount;
        params = location.state.params;
        quantity = location.state.quantity;
    }

    return (
        <>
            <Search />
            <FlightList 
                flights={flights} 
                page={page} 
                count={count} 
                totalCount={totalCount} 
                params={params}
                quantity={quantity}
            />
        </>
    )
}

export default Flights
