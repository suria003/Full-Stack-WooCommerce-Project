export const CREATE_ACCOUNT_API = async (account_datas) => {
    let output = {};

    try {
        const TARGET_API = "http://localhost:3000/api/v0.1/authendication/register";
        const response = await fetch(TARGET_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account_datas),
        });

        const result = await response.json();

        switch (response.status) {
            case 200:
            case 201:
                output = {
                    "status": true,
                    "message": result.message,
                }
                setTimeout(() => {
                    window.location.href = '/login';
                }, 500); //5 MS
                break;

            case 400:
            case 424:
            case 409:
            case 500:
                output = {
                    "status": false,
                    "message": result.message,
                }
                break;

            default:
                output = {
                    "status": false,
                    "message": result.message,
                }
                break;
        }

        return output;

    } catch (error) {
        output = {
            "status": false,
            "message": error.message,
        }
    }
};