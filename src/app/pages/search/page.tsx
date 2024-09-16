"use client";

import GridCards from "@/app/components/layout/GridCards";
import Hero from "@/app/components/layout/Hero";
import Slide from "@/app/components/movie/Slide";
import useGetMovies from "@/app/hooks/useGetMovies";
import useMoviesByGenre from "@/app/hooks/useMoviesByGenre";
import useSearch from "@/app/hooks/useSearch";
import useSearchFilter from "@/app/hooks/useSearchFilter";
import useSelectGenre from "@/app/hooks/useSelectGenre";
import Head  from "next/head";

const Search = () => {
  const { filter, handleFilterChange } = useSearchFilter();
  const { search, handleSearchChange } = useSearch();
  const { data } = useGetMovies({ search });
  const { genresOptions, selectedGenre, handleGenreChange } = useSelectGenre();
  const { moviesByGenre } = useMoviesByGenre(selectedGenre);

  return (
    <div>
      <Head>
        <title>Search Movies - Find Your Next Favorite Film</title>
        <meta
          name="description"
          content="Search for your next favorite movie. Filter by title or genre and explore a wide variety of films."
        />
        <meta property="og:title" content="Search Movies - Find Your Next Favorite Film" />
        <meta
          property="og:description"
          content="Search for your next favorite movie. Filter by title or genre and explore a wide variety of films."
        />
        <meta
          property="og:image"
          content="/path-to-your-image.jpg" // Reemplaza con la URL de la imagen que deseas usar para el OG
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Search Movies - Find Your Next Favorite Film" />
        <meta
          name="twitter:description"
          content="Search for your next favorite movie. Filter by title or genre and explore a wide variety of films."
        />
        <meta name="twitter:image" content="/path-to-your-image.jpg" /> // Reemplaza con la URL de la imagen que deseas usar para el Twitter Card
      </Head>
      <Hero
        title="Search the movie you want"
        paragraph="Find your next favorite movie"
        showSearch={true}
        search={search}
        onSearchChange={handleSearchChange}
        genresOptions={genresOptions}
        selectedGenre={selectedGenre}
        handleGenreChange={handleGenreChange}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <div className="flex flex-wrap gap-4 mt-6"></div>

      {filter == "title" && (
        <GridCards>
          {data && data.length > 0 ? (
            data.map((movie) => <Slide key={movie.id} data={movie} />)
          ) : (
            <p className="text-center font-semibold">No movies found.</p>
          )}
        </GridCards>
      )}

      {filter === "genre" && (
        <GridCards>
          {moviesByGenre && moviesByGenre.length > 0 ? (
            moviesByGenre.map((movie) => <Slide key={movie.id} data={movie} />)
          ) : (
            <p className="text-center font-semibold">
              No movies found by genre.
            </p>
          )}
        </GridCards>
      )}
    </div>
  );
};

export default Search;
