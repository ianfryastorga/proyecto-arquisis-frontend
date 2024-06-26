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
import ConfirmPurchase from "./Components/Purchase/ConfirmPurchase";
import DonePurchase from "./Components/Purchase/CompletedPurchase";
import Loading from "./Components/Loading/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import Recommendations from "./Components/Recommendations/Recommendations";
import AdminLanding from "./Components/Admin/AdminLanding";

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
                    path="/flights/:id/:request_id/confirm-purchase"
                    element={<ConfirmPurchase />}
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
                    path="/recommendations"
                    element={<Recommendations/>}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
                    path="/purchaseCompleted"
                    element={<DonePurchase />}
                />
                <Route
                    path="/admin"
                    element={<AdminLanding />}
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

