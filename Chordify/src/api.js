// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // your backend URL
});

export const getAllGuitars = () => API.get("/guitar/all");
export const approveGuitar = (id) => API.put(`/guitar/approve/${id}`);
export const rejectGuitar = (id) => API.put(`/guitar/reject/${id}`);
export const getApprovedGuitars = () => API.get("/guitar/approved");
export const getSuggestedGuitars = () => API.get("/guitar/suggested");
