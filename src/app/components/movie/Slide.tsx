import React from "react";
import Image from "next/image";
import { Movie } from "@/app/types/movieTypes";
import { CastMember } from "@/app/types/castTypes";
import Link from "next/link";
import { containsNullInUrl } from "@/app/utils/containNull";
import NotFound from "../common/icons/NotFound";
import { truncateString } from "@/app/utils/truncateString";

// Utiliza type guard para identificar el tipo
function isMovie(data: Movie | CastMember): data is Movie {
  return "poster_path" in data;
}

const Slide: React.FC<{ data: Movie | CastMember }> = ({ data }) => {
  // Verifica si el objeto es una Movie
  const isMovieType = isMovie(data);

  // Determina la URL de la imagen y el texto alternativo basado en el tipo de datos
  const imageUrl = isMovieType
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : `https://image.tmdb.org/t/p/w500${data.profile_path}`;

  const altText = isMovieType ? data.original_title : data.original_name;
  
  const containsNull = (containsNullInUrl(imageUrl))

  return (
    <div className="max-w-sm rounded overflow-hidden">
    {containsNull ? (
      <>
      <NotFound />

      <p className="text-center font-semibold">{altText}</p>
      </>
    ) : (
      <div>
        {imageUrl && (
          isMovieType ? (
            <Link href={`/pages/movies/${data.id}`}>
              <Image
                src={imageUrl}
                alt={altText}
                loading="lazy"
                width={170}
                height={250}
                className="object-cover rounded-lg drop-shadow-sm shadow-sm group-hover:shadow-none group-hover:drop-shadow-none transition-all duration-300 ease-in-out"
              />
              <p className="text-center font-semibold">{truncateString(data.title)}</p>
            </Link>
          ) : (
            <div className="flex flex-col">
              <Image
                src={imageUrl}
                alt={altText}
                loading="lazy"
                width={170}
                height={250}
                className="object-cover rounded-lg transition-all duration-300"
              />
              <p className="text-center font-semibold">{truncateString(data.original_name)}</p>
            </div>
          )
        )}
      </div>
    )}
  </div>
  );
};

export default Slide;
