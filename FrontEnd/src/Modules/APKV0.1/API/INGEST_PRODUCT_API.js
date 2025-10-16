import { CHK_PROFILE_API } from "./PROFILE_API";

export async function INGEST_PRODUCT_API() {

    const profileTkn = await CHK_PROFILE_API();

    let tkn = profileTkn.message;

    if (!tkn) return { loggedIn: false };

    try {

        const TARGET_API = "https://woo-commerce-backend.vercel.app/api/v0.1/ingests/product/";

        const response = await fetch(TARGET_API,{
            method: 'GET',
            "headers":{
                "Content-Type":"application/json",
                "authorization":tkn
            },
        });

        const result = await response.json()


        if (response.status === 400){

            sessionStorage.removeItem('authToken');
            window.location.href = "/";
            return { loggedIn: false };

        } else {

            return result;

        };

    } catch (error) {

        return error.message;

    }
};