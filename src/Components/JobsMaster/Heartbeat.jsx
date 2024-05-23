import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineRecommend } from "react-icons/md";

const Heartbeat = () => {
    const [available, setAvailable] = useState(false);
    
    useEffect(() => {
        const fetchAvailable = async () => {
            try {
                const response = await axios.get(`${ process.env.BACKEND_URL }/recommendations/heartbeat`);
                setAvailable(response.data.status);
            } catch (error) {
                setAvailable(false);
            }
        };
        fetchAvailable();
    }, [])


    return (
        <>
            {available ? ( <MdOutlineRecommend color="green" /> ) : (  <MdOutlineRecommend color="red" /> )}
        </>
    );
};

export default Heartbeat;