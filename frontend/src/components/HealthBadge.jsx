import { useEffect, useState } from "react";
import api from "../api/axios";

export default function HealthBadge() {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await api.get("/health");
                const data = res.data;
                if (data.status === "ok") {
                    setStatus("online");
                } else {
                    setStatus("offline");
                }
            } catch (error) {
                setStatus("offline");
            }
        };

        checkHealth();

        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    const getColor = () => {
        switch (status) {
            case "online":
                return "bg-green-500";
            case "offline":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    return (
        <span
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${getColor()}`}
        >
            <span className="w-2 h-2 rounded-full bg-white"></span>
            {status}
        </span>
    );
}
