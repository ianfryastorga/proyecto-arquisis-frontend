import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import './main.scss'

import Home from './Components/Home/Home';
import Profile from "./Components/Profile/Profile";
import Flight from './Components/Flights/Flight'; 

import Flights from "./Components/FlightList/Flights";
import Navbar from "./Components/Navbar/Navbar";
import Reservations from "./Components/Reservations/Reservations";
import Loading from "./Components/Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/flights/:id"
                    element={<Flight />}
                />
                <Route
                    path="/flights"
                    element={<Flights />}
                />
                <Route
                    path="/reservations"
                    element={<Reservations />}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </>
    )
}

export default App;

