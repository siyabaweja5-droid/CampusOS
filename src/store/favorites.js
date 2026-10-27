import { create } from "zustand";
export const useFavorites = create((set) => ({
    favorites: [],
    toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
            ? state.favorites.filter((item) => item !== id)
            : [...state.favorites, id]
    }))
}));
