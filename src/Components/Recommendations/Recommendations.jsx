import { useState, useEffect } from 'react';
import RecommendationList from './RecommendationList';
import { useAuth0 } from "@auth0/auth0-react"; 
import axios from 'axios';


const Recommendations = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            axios.get(`${process.env.BACKEND_URL}/recommendations`, { params: { username: user?.name } })
                .then(response => {
                    setRecommendations(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user?.name, isAuthenticated, isLoading]);

    return (
        <>
            <RecommendationList recommendations={recommendations}/>
        </>
    )
}

export default Recommendations;
