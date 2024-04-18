import Navbar from "../Navbar/Navbar"
import { useParams } from "react-router-dom";

const FlightDetails = () => {
    let { id } = useParams();

    return (
        <>
            <Navbar />
            <div>Funcion {id} </div>
        </>
    )
}

export default FlightDetails