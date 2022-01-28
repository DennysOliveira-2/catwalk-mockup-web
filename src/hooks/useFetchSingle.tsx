import { useEffect, useState } from "react";
import { SingleRequestResult } from "../@types/SupermarketListing";

const useFetchSingle = (url: RequestInfo) => {
    const [data, setData] = useState<SingleRequestResult>();
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

export default useFetchSingle;