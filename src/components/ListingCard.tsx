import React from 'react';
import { SupermarketListing } from '../@types/SupermarketListing';

export default function ListingCard({ supermarket }: { supermarket: SupermarketListing }) {

    return (
        <div className='card-container' onClick={() => {
            console.log("clicked card ", supermarket._id)
        }}>
            <div className='image-container'>
                <div className='main-image'>
                    <img src={supermarket.mainImage} />
                </div>
                <div className='additional-images'>

                </div>
                <div className='card-content'>
                    <h2>{supermarket.name}</h2>
                    <h4>{supermarket.location.district}, {supermarket.location.city} - {supermarket.location.state}</h4>
                    <p>{supermarket.description.substring(0, 100)}...</p>
                </div>
            </div>
        </div>
    )
}