import { Link } from "react-router";

function Header() {
    return (
        <>
            <nav className='flex gap-2 bg-emerald-300'>
                <Link to="/">Home</Link>
                <Link to="/About">About</Link>
                <Link to="/Career">Career</Link>
                <Link to="/Contact">Contact</Link>
            </nav>
        </>
    )
}

export default Header
