import Hero from "@/app/components/layout/Hero";
import Container from "@/app/components/layout/Container";
import GridCards from "@/app/components/layout/GridCards";
import { getTopRatedMovies } from "@/app/services/httpClient";
import Slide from "@/app/components/movie/Slide";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Top Rated Movies",
    description: "Explore the top rated movies by critics and audiences alike.",
    openGraph: {
      title: "Top Rated Movies",
      description:
        "Explore the top rated movies by critics and audiences alike.",
      images: [
        {
          url: "/path-to-your-top-rated-movies-image.jpg", // Cambia esto a la URL de la imagen que quieras usar
          width: 1200,
          height: 630,
          alt: "Top Rated Movies",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Top Rated Movies",
      description:
        "Explore the top rated movies by critics and audiences alike.",
      images: ["/path-to-your-top-rated-movies-image.jpg"], // Cambia esto a la URL de la imagen que quieras usar
    },
  };
}

const TopRated = async () => {
  const topRated = await getTopRatedMovies();

  return (
    <div>
      <Hero
        title="View the most top rated movies"
        paragraph=""
        showSearch={false}
      />

      <Container>
        <GridCards>
          {topRated?.results.map((movie) => (
            <Slide key={movie.id} data={movie} />
          ))}
        </GridCards>
      </Container>
    </div>
  );
};

export default TopRated;
