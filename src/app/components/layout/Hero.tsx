"use client";
import classNames from "classnames";
import Container from "./Container";
import SearchFilter from "../common/SearchFilters/SearchFilters";
import useSearchFilter from "@/app/hooks/useSearchFilter";
import { Genre } from "@/app/types/movieTypes";

interface HeroProps {
  title: string;
  paragraph: string;
  showSearch: boolean;
  backgroundImage?: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  genresOptions?: Genre[];
  selectedGenre?: number | "";
  handleGenreChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filter?: string;
  handleFilterChange?: (newFilter: string) => void;
}

const Hero: React.FC<HeroProps> = ({
  title,
  paragraph,
  showSearch,
  backgroundImage,
  search,
  onSearchChange,
  handleGenreChange,
  selectedGenre,
  genresOptions,
  filter,
  handleFilterChange,
}) => {
  const imageUrl = backgroundImage
    ? `https://image.tmdb.org/t/p/original/${backgroundImage}`
    : "/banner-pelis.webp";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  return (
    <div
      className={classNames(
        "relative bg-gray-100 pb-12 h-[500px]",
        backgroundImage ? "bg-cover bg-center bg-no-repeat" : ""
      )}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>

      <Container>
        <div className="relative z-10">
          <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-black leading-7 md:leading-10">
                {title}
              </h1>
              <p className="mt-5 sm:mt-10 lg:w-10/12 text-white font-normal text-center text-sm sm:text-lg">
                {paragraph}
              </p>
            </div>

            {showSearch && handleFilterChange && (
              <SearchFilter onFilterChange={handleFilterChange} />
            )}

            <div className="flex justify-center items-center">
              {showSearch && filter === "title" && (
                <div className="sm:border border-white flex-col sm:flex-row flex items-center lg:w-full w-full space-y-4 sm:space-y-0">
                  <input
                    className="border border-white sm:border-transparent text-base w-full font-medium leading-none text-gray-400 p-4 focus:outline-none bg-white placeholder-gray-300"
                    placeholder="Find your movie 🔍"
                    value={search || ""} // Asegúrate de que el valor sea opcional
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Render select de géneros si el filtro es "genre" */}
              {showSearch && filter === "genre" && genresOptions && (
                <select
                  className="border border-white sm:border-transparent text-base w-full font-medium leading-none text-gray-400 p-4 focus:outline-none bg-white placeholder-gray-300"
                  onChange={handleGenreChange}
                  value={selectedGenre}
                >
                  <option value="" disabled>
                    Select genre
                  </option>
                  {genresOptions.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
