import api from "./axios";

// GET profile
export const getProfile = async () => {
    const res = await api.get("/profile");
    return res.data;
};

// CREATE or UPDATE profile
export const saveProfile = async (profile) => {
    const res = await api.post("/profile", profile);
    return res.data;
};
