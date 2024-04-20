import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from './Components/Home/Home';
import Profile from "./Components/Profile/Profile";
import Flight from './Components/Flights/Flight'; 

import './main.scss'
import Flights from "./Components/FlightList/Flights";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    return (
        <>
            <Router>
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
                        path="/profile"
                        element={<Profile />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App;

