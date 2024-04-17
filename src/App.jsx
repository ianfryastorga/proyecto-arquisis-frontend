import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from './Components/Home/Home'
import SignUp from './Components/Forms/SignUp'
import SignIn from './Components/Forms/SignIn'
import Profile from "./Components/Profile/Profile";


import './main.scss'

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

export default App
