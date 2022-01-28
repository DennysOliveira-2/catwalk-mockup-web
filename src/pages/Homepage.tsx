import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ListingCard from '../components/ListingCard';
import Loading from '../components/Loading';
import useFetch from '../hooks/useFetch';
import apiConfig from '../API_CONFIG.json';

console.log(apiConfig.API_URL)

export default function Homepage() {
    const { loading, error, data } = useFetch(`${apiConfig.API_URL}/v1/supermarket`);

    if (loading) return (<Loading />);
    if (error) return (<div>
        <p>Error:</p>
        <p>{JSON.stringify(error.message)}</p>
    </div>);

    if (data) return (
        <Layout>
            {
                data.result.map(listing => (
                    <div className='cards-wrapper'>
                        <Link to={`/listing/${listing._id}`}><ListingCard
                            supermarket={listing}
                        /></Link>
                    </div>
                ))
            }
        </Layout >
    );

    return (
        <div>
            A
        </div>
    )
}
