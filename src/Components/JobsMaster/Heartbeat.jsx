import { useEffect, useState } from "react";
import axios from "axios";

const Heartbeat = () => {
    const [available, setAvailable] = useState("false");
    
    useEffect(() => {
        const fetchAvailable = async () => {
            try {
                const response = await axios.get(`${ process.env.BACKEND_URL }/recommendations/heartbeat`);
                setAvailable(`${response.data.status}`);
            } catch (error) {
                setAvailable("false");
            }
        };
        fetchAvailable();
    }, [])


    return (
        <div className="profile">
            <div className="profileContainer">
                <h2>Disponible: {available}</h2>
            </div>
        </div>
    );
};

export default Heartbeat;