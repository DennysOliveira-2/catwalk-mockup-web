import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import Homepage from './pages/Homepage';


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/listing/create" element={<CreateListing />} />
                <Route path="/listing/:id" element={<ListingDetails />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);