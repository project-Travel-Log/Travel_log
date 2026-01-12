import apiClient from "./axios";

export const toggleWishlist = (placesId) =>
    apiClient.post("/api/wishlist", { places_id: placesId });

export const checkWishlist = (placesId) =>
    apiClient.get(`/api/wishlist/${placesId}`);
