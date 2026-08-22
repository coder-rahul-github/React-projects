import { Routes, Route } from "react-router-dom";
import Home from "../PageComponent/Home";
import About from "../PageComponent/About";
import Career from "../PageComponent/Career";
import Contact from "../PageComponent/Contact";
import Outline from "../Outline";

function Header() {
    return (
        <div>
            <Outline />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="career" element={<Career />} />
                <Route path="contact" element={<Contact />} />
            </Routes>
        </div>
    );
}

export default Header;
