// components/NavBar.js

import Link from 'next/link';

const NavBar = () => {
    return (
            <div className="mx-auto h-20 px-2 md:px-44 bg-gray-800 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        <p className="text-white text-2xl font-semibold">Strix Invoice</p>
                    </Link>
                </div>
                <div className="space-x-4 flex ">
                    <Link href="/">
                        <p className="text-white hover:text-gray-400">about</p>
                    </Link>
                    <Link href="/contact">
                        <p className="text-white hover:text-gray-400">contact Us</p>
                    </Link>
                </div>
            </div>
    );
};

export default NavBar;
