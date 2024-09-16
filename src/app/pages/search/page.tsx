"use client";

import GridCards from "@/app/components/layout/GridCards";
import Hero from "@/app/components/layout/Hero";
import Slide from "@/app/components/movie/Slide";
import useGetMovies from "@/app/hooks/useGetMovies";
import useMoviesByGenre from "@/app/hooks/useMoviesByGenre";
import useSearch from "@/app/hooks/useSearch";
import useSearchFilter from "@/app/hooks/useSearchFilter";
import useSelectGenre from "@/app/hooks/useSelectGenre";

const Search = () => {
  const { filter, handleFilterChange } = useSearchFilter();
  const { search, handleSearchChange } = useSearch();
  const { data } = useGetMovies({ search });
  const { genresOptions, selectedGenre, handleGenreChange } = useSelectGenre();
  const { moviesByGenre } = useMoviesByGenre(selectedGenre);

  return (
    <div>
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
