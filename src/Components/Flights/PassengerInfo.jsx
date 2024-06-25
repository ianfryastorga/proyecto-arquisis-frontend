import { FaPlus, FaMinus } from "react-icons/fa6";

const PassengerInput = ({max, passengers, setPassengers}) => {

    const handleChange = (event) => {
        if (event.target.value < 0 ) {
            return setPassengers(0);
        }
        if (event.target.value > max) {
            return setPassengers(max);
        }
        setPassengers(event.target.value);
    };

    const handleIncrement = () => {
        if (Number(passengers) < max) {
            setPassengers(passengers + 1);
        }
    };

    const handleDecrement = () => {
        if (Number(passengers) > 0) {
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