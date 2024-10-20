import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

const Navbar = () => {
    const [ minimized, setMinimized ] = useState(false);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 100) {
            setMinimized(true);
        } else {
            setMinimized(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [ handleScroll ]);

    return (
        <div 
            style={{
                background: minimized ? "rgba(0,0,0, 0.5)" : "transparent",
                backdropFilter: minimized ? "blur(5px)" : undefined,
                WebkitBackdropFilter: minimized ? "blur(5px)" : undefined
            }}
            className="fixed px-3 py-2 w-full z-50 transition-all">
            <nav className="flex justify-center items-center">
                <div style={{ 
                    height: minimized ? 50 :  100, width: minimized ? 50 :  100 
                }} className="relative transition-all duration-300">
                    <Image src={"/sbcsclub/logo.png"} layout="fill" objectFit="contain" />
                </div>
                <ul className="text-white flex space-x-6 p-2">
                    <li>
                        <a href="#home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#overview">
                            Overview
                        </a>
                    </li>
                    <li>
                        <a href="#workshops">
                            Workshops
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar; 