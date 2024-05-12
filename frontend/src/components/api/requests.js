import axios from "axios";

const api = axios.create({baseURL: "http://localhost:5000"});

export const loginUser = (formData) => api.post("/auth/login", formData, {withCredentials:true});
export const logoutUser = () => axios.get("http://localhost:5000/auth/logout");
export const getAttendence = () => api.get("/attendence");
