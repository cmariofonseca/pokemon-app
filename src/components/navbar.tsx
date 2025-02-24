"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold cursor-pointer">PokéList</h1>
        </Link>

        <div className="flex gap-4">
          {pathname !== "/" && (
            <Link href="/">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md">
                🏠 Pokémon List
              </button>
            </Link>
          )}

          {pathname !== "/favorites" && (
            <Link href="/favorites">
              <button className="bg-yellow-400 text-white px-4 py-2 rounded-md shadow-md">
                ⭐ Favorites
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
