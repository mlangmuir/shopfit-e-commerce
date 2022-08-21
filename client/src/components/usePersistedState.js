import { useState, useEffect } from "react";

const usePersistedState = (key, value) => {

    const [state, setState] = useState(value);

    useEffect(() => {
        const data = localStorage.getItem(key);
        if (data) {
            setState(JSON.parse(data));
        }
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;