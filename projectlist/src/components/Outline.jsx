import { Routes,Route, BrowserRouter } from "react-router";
import Header from "./header/Header";
import Home from "./PageComponent/Home";
import About from "./PageComponent/About";
import Career from "./PageComponent/Career";
import Contact from "./PageComponent/Contact";

function Outline() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Career" element={<Career />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Outline;
