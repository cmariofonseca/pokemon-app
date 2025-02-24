import { create } from "zustand";

export interface FavoritePokemon {
  name: string;
  id?: number;
}

interface FavoritesState {
  favorites: FavoritePokemon[];
  addFavorite: (pokemon: FavoritePokemon) => void;
  removeFavorite: (name: string) => void;
  initializeFavorites: () => void;
}

const useFavorites = create<FavoritesState>((set) => ({
  favorites: [],

  initializeFavorites: () => {
    if (typeof window !== "undefined") {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") ?? "[]"
      ) as FavoritePokemon[];
      set({ favorites: storedFavorites });
    }
  },

  addFavorite: (pokemon: FavoritePokemon) =>
    set((state) => {
      const updatedFavorites = [...state.favorites, pokemon];
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
      return { favorites: updatedFavorites };
    }),

  removeFavorite: (name: string) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((fav) => fav.name !== name);
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
      return { favorites: updatedFavorites };
    }),
}));

export default useFavorites;
