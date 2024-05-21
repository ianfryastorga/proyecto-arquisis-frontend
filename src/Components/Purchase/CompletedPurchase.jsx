import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

const DonePurchase = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const commitTransaction = async () => {
        try {
            const response = await axios.post(`${ process.env.BACKEND_URL }/requests/commit`, {
                ws_token: searchParams.get('token_ws')
            });
            return response.data;
        } catch (error) {
            console.error('Error committing transaction:', error);
        }
    }

    const {data, isLoading} = useQuery({
        queryKey: ['completed-purchase'],
        queryFn: () => commitTransaction({ token: searchParams.get('token_ws') || '' })
        
    })

    if (isLoading) {
        return (
            <div className="p-20">
                <h1>Loading...</h1>
            </div>
        )
    }

    console.log(data)

    return (
        <div className='flightDetail'>
            <div data-aos='fade-up' data-aos-duration='1000' className="flightContainer">
                <div className="p-8 mt-20 flex flex-col gap-3 w-1/3 mx-auto rounded-xl shadow-[0_0px_8px_#b4b4b4]">
                    <h1 className="text-center">Purchase Completed</h1>
                    <p>{data.message}</p>
                    <Link to="/" className="bg-black text-white px-3 py-2 rounded text-center">Volver a inicio</Link>
                </div>
            </div>
        </div>

    );
}

export default DonePurchase;