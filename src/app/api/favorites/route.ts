// app/api/favorites/route.ts
import { NextResponse } from 'next/server';
import { Movie } from '../../types/movieTypes';

let favorites: Movie[] = [];

export async function GET() {
  return NextResponse.json(favorites);
}

export async function POST(request: Request) {
  const movie: Movie = await request.json();

  if (!favorites.some(fav => fav.id === movie.id)) {
    favorites.push(movie);
  }

  return NextResponse.json(favorites);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  favorites = favorites.filter(fav => fav.id !== id);

  return NextResponse.json(favorites);
}
