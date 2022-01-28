import React, { FormEventHandler, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { convertToObject } from 'typescript';
import { SupermarketListing } from '../@types/SupermarketListing';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import apiConfig from '../API_CONFIG.json';
import { useNavigate } from 'react-router-dom';



export default function UpdateListing() {
    const navigate = useNavigate();
    // Product Information
    const [name, setName] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const [phone, setPhone] = useState<string>()
    const [mainImage, setMainImage] = useState<File | null>();
    const [additionalImages, setAdditionalImages] = useState<FileList | null>();

    // Product Location
    const [street, setStreet] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [district, setDistrict] = useState<string>();
    const [city, setCity] = useState<string>();
    const [state, setState] = useState<string>();
    const [zip, setZip] = useState<string>();
    const [country, setCountry] = useState<string>();

    async function putImageOnBucket(file: File) {
        const response = await fetch(`${apiConfig.API_URL}/v1/secures3`);
        const data = await response.json();
        const url = data.result;

        const s3response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: mainImage
        });

        console.log(s3response);
        const finalURL: string = url.split("?")[0];
        return finalURL;
    }

    // Form Submit Action
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let mainImageURL = "";

        if (mainImage) {
            mainImageURL = await putImageOnBucket(mainImage);
        }

        let additionalImagesURL = []

        if (additionalImages != null && additionalImages.length >= 1) {
            for (let i = 0; i < additionalImages.length; i++) {
                let file = additionalImages.item(i);

                if (file) {
                    additionalImagesURL.push(await putImageOnBucket(file))
                    console.log(`Uploading file ${file.name}`);
                }
            }
        }

        const result = await fetch(`${apiConfig.API_URL}/v1/supermarket`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "mainImage": mainImageURL,
                "additionalImages": additionalImagesURL,
                "location": {
                    "street": street,
                    "number": number,
                    "district": district,
                    "city": city,
                    "state": state,
                    "zip": zip,
                    "country": country
                },
                "description": desc,
                "phone": phone
            })
        });

        const creationData = await result.json()
        console.log(creationData.result.message._id)
        navigate(`/listing/${creationData.result.message._id}`)

        console.log(result)
    }

    // Form Render
    return (
        <Layout>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Create new Listing</h2>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder='Name' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value)
                        }}
                    />

                    <label>Description</label>
                    <textarea
                        placeholder='Description' required
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setDesc(e.target.value)
                        }}
                    />

                    <label>Address</label>
                    <input type="text"
                        placeholder='Street' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setStreet(e.target.value) }} />

                    <input type="number" placeholder='Number' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setNumber(parseInt(e.target.value)) }} />

                    <input type="text"
                        placeholder='District' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDistrict(e.target.value) }} />

                    <input type="text"
                        placeholder='City' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCity(e.target.value) }} />

                    <input type="text"
                        placeholder='State' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setState(e.target.value) }} />

                    <input type="text"
                        placeholder='ZIP Code' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setZip(e.target.value) }} />

                    <input type="text"
                        placeholder='Country' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCountry(e.target.value) }} />

                    <input type="text"
                        placeholder='Phone' className='text-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPhone(e.target.value) }} />

                    <label>Main Image</label>
                    <input
                        type='file' className='img-input' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let file = e.target.files![0];
                            setMainImage(file)
                        }}
                    />

                    <label>Additional Images</label>
                    <input
                        type='file' multiple className='img-input'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setAdditionalImages(e.target.files);
                        }}
                    />


                    <input className='button' type="submit" value="Create" />
                </form>
            </div>
        </Layout>
    )
}
