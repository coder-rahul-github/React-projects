import { Link } from "react-router-dom";

function Outline() {
    return (
        <>
            <div className='flex gap-2 bg-emerald-300'>

                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/career">Career</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </>
    )
}

export default Outline;
