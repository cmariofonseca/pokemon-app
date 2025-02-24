"use server";

import { revalidatePath } from "next/cache";
import useFavorites from "../store/use-favorites";

export async function toggleFavoriteAction(name: string) {
  const { addFavorite, removeFavorite, favorites } = useFavorites.getState();
  const isFavorite = favorites.some((fav) => fav.name === name);

  if (isFavorite) {
    removeFavorite(name);
  } else {
    addFavorite({ name });
  }

  revalidatePath("/favorites");
}
