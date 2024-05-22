import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import Loading from "../Loading/Loading";

const DonePurchase = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    const commitTransaction = async () => {
        try {
            const response = await axios.post(`${ process.env.BACKEND_URL }/requests/commit`, {
                ws_token: searchParams.get('token_ws'),
                tbk_token: searchParams.get('TBK_TOKEN')
            });
            return response.data;
        } catch (error) {
            console.error('Error committing transaction:', error);
        }
    }

    const {data, isLoading} = useQuery({
        queryKey: ['completed-purchase'],
        queryFn: () => commitTransaction({ token: searchParams.get('token_ws') || '', cancelledToken: searchParams.get('TBK_TOKEN') || ''})
        
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }

    console.log(data)

    return (
        <div className='purchase'>
            <div data-aos='fade-up' data-aos-duration='1000' className="purchaseContainer">
                <div className='purchaseForm'>
                    <h1 className='purchaseTitle'>Resultado de compra</h1>
                    <div className="purchaseMessage">{data.message}</div>
                    <Link to="/" className="btn">Volver a inicio</Link>
                </div>
            </div>
        </div>

    );
}

export default DonePurchase;