import { useEffect, useState } from "react";
import { RequestResult } from "../@types/SupermarketListing";

const useFetch = (url: RequestInfo) => {
    const [data, setData] = useState<RequestResult>();
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(Boolean);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url);
                const json = await res.json();

                setData(json);
                setLoading(false);
            }
            catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData()
    }, [url]);

    return { loading, error, data }
}

export default useFetch;