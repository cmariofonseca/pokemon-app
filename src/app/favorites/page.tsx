"use client";

import useFavorites from "@/store/use-favorites";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((pokemon) => (
          <div key={pokemon.name} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
