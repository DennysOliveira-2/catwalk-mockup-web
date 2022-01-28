import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import useFetchSingle from '../hooks/useFetchSingle';
import apiConfig from '../API_CONFIG.json';
import Loading from '../components/Loading';

export default function ListingDetails() {
    const params = useParams();
    const navigate = useNavigate();

    const { error, loading, data } = useFetchSingle(`${apiConfig.API_URL}/v1/supermarket/${params.id}`)

    if (loading) return (
        <Loading />
    )

    if (error) return (
        <p>Error!</p>
    )

    const handleDelete = async () => {
        const result = await fetch(`${apiConfig.API_URL}/v1/supermarket/${data!.result._id}`, {
            method: 'DELETE'
        });

        navigate(`/`)
    }
    console.log(data?.result.additionalImages)
    if (data) return (
        <Layout>
            <div className='details-container'>
                <a onClick={() => { }}> Update </a>
                <a onClick={(event) => { handleDelete() }}> Delete </a>

                <h2>{data.result.name}</h2>
                <div className='details-img-container'>
                    <img className='main-img' src={data.result.mainImage} />
                    <img className='additional-img' src={data.result.additionalImages![0]} />
                    <img className='additional-img' src={data.result.additionalImages![1]} />
                    {data.result.additionalImages!.forEach(element => {
                        return (
                            <img className='additional-img' src={element} />
                        )
                    })}
                </div>
                <div className='address-container'>
                    <p>Address</p>

                </div>


            </div>
        </Layout>
    );

    return (
        <></>
    )
}
