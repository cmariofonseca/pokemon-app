"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFavorites from "../store/use-favorites";
import { Pokemon } from "../types/pokemon.types";

export default function PokemonCard({ pokemon }: { readonly pokemon: Pokemon }) {
  const { favorites, addFavorite, removeFavorite, initializeFavorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    initializeFavorites();
  }, [initializeFavorites]);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.name === pokemon.name));
  }, [favorites, pokemon.name]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon);
    }
  };

  const pokemonId =
    pokemon.id ??
    (pokemon.url ? parseInt(pokemon.url.split("/").filter(Boolean).pop() || "", 10) : 0);

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 text-center">
      <div className="relative w-24 h-24 mx-auto mb-2">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>

      <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>

      <Link href={`/${pokemon.id}`} className="text-blue-500 hover:underline block mb-2">
        More Info
      </Link>

      <button
        onClick={toggleFavorite}
        className={`px-4 py-2 rounded ${isFavorite ? "bg-red-500" : "bg-green-500"} text-white`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
