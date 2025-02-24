"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PokemonCard from "../components/pokemon-card";
import Pagination from "../components/pagination";
import { Pokemon } from "../types/pokemon.types";

async function fetchPokemons(page = 1, limit = 10): Promise<Pokemon[]> {
  const offset = (page - 1) * limit;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data.results.map((pokemon: { name: string; url: string }) => ({
    ...pokemon,
    id: parseInt(pokemon.url.split("/").filter(Boolean).pop() ?? "", 10),
  }));
}

export default function Home() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons(page).then(setPokemons);
  }, [page]);

  return (
    <div className="px-10 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <Pagination currentPage={page} />
    </div>
  );
}
