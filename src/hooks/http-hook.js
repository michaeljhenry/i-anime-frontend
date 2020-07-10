import {useState, useCallback, useRef, useEffect} from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]); // logic for if a response is incoming gbut the user switches pages before it arrives. we want to abort that request.

    // wrapped in useCallback to avoid function re-creation when the component that uses this function re-renders and avoids infinite loops
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);
            if(!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;
        } catch(err) {
            setError(err);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(false);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])
    return {isLoading, error, sendRequest, clearError};
};