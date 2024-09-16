// src/app/page.tsx

import React from "react";
import Hero from "./components/layout/Hero";
import ContainerSlidesMovies from "./components/layout/ContainerSlidesMovies";
import { getMostPopularMovies, getTopRatedMovies } from "./services/httpClient";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Explore Movies - Discover Popular and Top Rated Films",
    description:
      "Discover an endless collection of films. Explore popular and top-rated movies, blockbusters, indie gems, and more.",
    openGraph: {
      title: "Explore Movies - Discover Popular and Top Rated Films",
      description:
        "Discover an endless collection of films. Explore popular and top-rated movies, blockbusters, indie gems, and more.",
      images: [
        {
          url: "/path-to-your-image.jpg", // Cambia esto a la URL de la imagen que quieras usar
          width: 1200,
          height: 630,
          alt: "Explore Movies - Discover Popular and Top Rated Films",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Explore Movies - Discover Popular and Top Rated Films",
      description:
        "Discover an endless collection of films. Explore popular and top-rated movies, blockbusters, indie gems, and more.",
      images: ["/path-to-your-image.jpg"], // Cambia esto a la URL de la imagen que quieras usar
    },
  };
}

const Page = async () => {
  const topRateMovies = await getTopRatedMovies();
  const popularMovies = await getMostPopularMovies();

  return (
    <section>
      <Hero
        title="Explore the Movies You Love"
        paragraph="Discover an endless collection of films. Whether you’re into blockbusters or indie gems, we have something for everyone."
        showSearch={false}
      />
      <ContainerSlidesMovies
        title="Popular Movies"
        data={popularMovies}
        showViewAll={true}
        hrefShowAll="/pages/popular"
      />
      <ContainerSlidesMovies
        title="Top Rated Movies"
        data={topRateMovies}
        showViewAll={true}
        hrefShowAll="/pages/topRated"
      />
    </section>
  );
};

export default Page;
