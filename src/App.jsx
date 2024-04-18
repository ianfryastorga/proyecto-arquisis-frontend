import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './Components/Home/Home'
import SignUp from './Components/Forms/SignUp'
import SignIn from './Components/Forms/SignIn'


import './main.scss'
import Flights from "./Components/FlightList/Flights";
import FlightDetails from "./Components/FlightDetails/FlightDetails";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route
              path="/flights"
              element={<Flights />}
            />
            <Route
              path="/flights/:id"
              element={<FlightDetails />}
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

export default App
