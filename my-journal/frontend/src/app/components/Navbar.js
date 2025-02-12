import React from 'react';

export const Navbar = (props) => {
    return (
        <nav className="bg-white-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-black text-lg font-bold font-sans cursor-pointer">
                        <img src="/assets/journal.png" alt="My Journal" className="inline-block h-6 w-6 mr-2" />
                        My Journal
                    </div>
                    <div>
                        <span className="text-black-300 font-sans hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-bold">{props.email}</span>
                        </div>
                    <div>
                        <button  className="text-black-300 font-sans hover:text-indigo-500 px-3 py-2 rounded-md text-sm font-bold"
                        onClick={props.handleLogout}
                        >Logout</button>
                    </div>
                </div>
            </nav>
    );
};

