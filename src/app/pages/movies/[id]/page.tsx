import Fav from "@/app/components/common/icons/Fav";
import Container from "@/app/components/layout/Container";
import ContainerSlidesMovies from "@/app/components/layout/ContainerSlidesMovies";
import Hero from "@/app/components/layout/Hero";

import {
  getMovieCast,
  getMovieTrailer,
  getSimilarMovies,
  searchMovieById,
} from "@/app/services/httpClient";
import { Movie } from "@/app/types/movieTypes";
import Image from "next/image";
const MovieDetail = async ({ params }: { params: { id: string } }) => {
  const movie = await searchMovieById(parseInt(params.id));
  const similarMovies = await getSimilarMovies(parseInt(params.id));
  const castMovie = await getMovieCast(parseInt(params.id));
  const trailer = await getMovieTrailer(Number(params.id));

  const response = await fetch('http://localhost:3000/api/favorites');
  const favorites: Movie[] = await response.json();
  const isFav = favorites.some((fav: Movie) => fav.id === movie.id);

  console.log(favorites)
  
  return (
    <>
      <Hero
        title={movie.title}
        paragraph=""
        showSearch={false}
        backgroundImage={movie.backdrop_path}
      />
      <Container>
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Detalles de la película */}
            <div className="md:w-2/3">
              <div className="flex justify-between">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {movie.title}
                </h3>
                
                <Fav movie={movie} initialIsFav={isFav} />
              </div>
              <p className="text-gray-700 mb-4">{movie.overview}</p>
              <div className="flex flex-wrap mb-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {movie.runtime} min
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {movie.release_date}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Rating: {movie.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Genres
                </h2>
                <div className="flex flex-wrap">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Production Companies
                </h2>
                <ul>
                  {movie.production_companies.map((company) => (
                    <li key={company.id} className="mb-1">
                      {company.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ContainerSlidesMovies title="Cast" data={castMovie} />
          <div className="flex flex-col justify-center">
            <div className="py-3">
              <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] text-slate-900 sm:font-bold font-semibold border-b-2 border-slate-900 inline-block">
                Trailer
              </h3>
            </div>
            {trailer ? (
              <iframe
                width="100%"
                height="600px"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No trailer available</p>
            )}
          </div>
        </div>

        <ContainerSlidesMovies title="Similar Movies" data={similarMovies} />
      </Container>
    </>
  );
};

export default MovieDetail;
