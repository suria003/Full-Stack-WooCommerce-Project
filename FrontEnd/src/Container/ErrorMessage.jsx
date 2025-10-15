import { useEffect, useState } from "react";

export default function ErrorMessage({ error }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (error) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (!visible || !error) return null;

    return (
        <div
            className="text-center text-white bg-red-600 px-[20px] py-[10px] rounded-[8px] ml-auto mr-auto font-semibold absolute top-[10px] left-1/2 -translate-x-1/2"
        >
            {error}
        </div>
    );
}