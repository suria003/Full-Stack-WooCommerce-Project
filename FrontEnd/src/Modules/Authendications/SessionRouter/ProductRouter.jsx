import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProducteRouter({ children }){

    const navigate = useNavigate();

    const tkn = sessionStorage.getItem('authToken');

    useEffect(() => {
        if(tkn){
            navigate('/', { replace: true });
        }
    }, [tkn, navigate]);

    return !tkn ? children : null;
}