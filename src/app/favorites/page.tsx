"use client";

import { useEffect } from "react";
import useFavorites from "@/store/use-favorites";
import Image from "next/image";

export default function FavoritesPage() {
  const { favorites, initializeFavorites, removeFavorite } = useFavorites();

  useEffect(() => {
    initializeFavorites();
  }, [initializeFavorites]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4"
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              width={96}
              height={96}
            />
            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
            <button
              onClick={() => removeFavorite(pokemon.name)}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
