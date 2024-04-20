import { FaPlus, FaMinus } from "react-icons/fa6";

const PassengerInput = ({passengers, setPassengers}) => {

    const handleChange = (event) => {
        setPassengers(event.target.value);
    };

    const handleIncrement = () => {
        setPassengers(passengers + 1);
    };

    const handleDecrement = () => {
        if (passengers > 0) {
            setPassengers(passengers - 1);
        }
    };

    return (
        <div>
            <button onClick={handleDecrement} className="btn noBg"><FaMinus/></button>
            <input type="number" size="600" value={passengers} onChange={handleChange} />
            <button onClick={handleIncrement} className="btn noBg"><FaPlus/></button>
        </div>
    );
};

export default PassengerInput;