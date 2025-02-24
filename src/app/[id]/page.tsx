import { notFound } from "next/navigation";
import Image from "next/image";
import { Pokemon } from "../../types/pokemon.types";

async function fetchPokemonDetails(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    notFound();
  }
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    height: data.height,
    weight: data.weight,
    types: data.types.map((type: { type: { name: string } }) => type.type.name),
  };
}

export default async function PokemonDetails({ params }: { params: { id: string } }) {
  const pokemon = await fetchPokemonDetails(params.id);

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      </div>

      <div className="relative w-24 h-24 mx-auto mb-2">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>

      <div className="flex justify-center">
        <div>
          <div>
            <strong>ID:</strong> {pokemon.id}
          </div>
          <div>
            <strong>Height:</strong> {pokemon.height}
          </div>
          <div>
            <strong>Weight:</strong> {pokemon.weight}
          </div>
          <div>
            <strong>Types:</strong> {pokemon.types?.map((type) => type).join(", ") ?? "Unknown"}
          </div>
        </div>
      </div>
    </div>
  );
}
