import { useContext } from 'react';

import { AuthContext } from '../Contexts/AuthContextProvider';

const useLoading = () => {
    const { loading, setLoading }: any = useContext(AuthContext);

    return {
        loading,
        setLoading,
    };
};

export default useLoading;
