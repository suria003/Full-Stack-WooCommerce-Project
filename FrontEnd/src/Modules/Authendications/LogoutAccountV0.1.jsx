export default function LogoutAccount({ quickmsg }) {

    const LogoutFunc = async () => {

        try {
            const authToken = sessionStorage.getItem('authToken');

            if (!authToken) {
                quickmsg("Session can't found.");
                sessionStorage.removeItem('authToken');
                setTimeout(() => {
                    window.location.href = "/login";
                }, 500); //5 MS
                return;
            }

            const TARGET_API = "https://woo-commerce-backend.vercel.app/api/v0.1/session/logout/";

            const response = await fetch(TARGET_API, {
                method: "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ authToken }),
            });

            const result = await response.json();

            switch (response.status) {
                case 200:
                case 400:
                case 404:
                case 500:
                    quickmsg(result.message);
                    sessionStorage.removeItem('authToken');
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 500); //5 MS

                default:
                    quickmsg(result.message);
                    sessionStorage.removeItem('authToken');
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 500); //5 MS
            };

        } catch (error) {
            quickmsg(result.message);
            console.log(error.message);
            sessionStorage.removeItem('authToken');
            setTimeout(() => {
                window.location.href = "/login";
            }, 500); //5 MS
        }
    };

    return (
        <>
            <button onClick={LogoutFunc} className="fixed right-2 bottom-2 py-2 px-5 bg-red-600 rounded-lg text-white cursor-pointer">
                Logout
            </button>
        </>
    );
}