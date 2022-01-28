import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <nav>
                <Link className='logo' to="/"><h1>Supermarket Listing</h1></Link>
                <ul className='nav-list'>
                    <li><Link to="/listing/create"><h2>Create Listing</h2></Link></li>
                    <li><Link to="#"><h2>My Listings</h2></Link></li>
                </ul>

            </nav>
        </header>
    );
}
