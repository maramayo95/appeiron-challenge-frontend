// src/app/page.tsx

import React from 'react';
import Hero from './components/layout/Hero';
import ContainerSlidesMovies from './components/layout/ContainerSlidesMovies';
import { getMostPopularMovies, getTopRatedMovies } from './services/httpClient';

const Page = async () => {

  const topRateMovies = await getTopRatedMovies()
  const popularMovies = await getMostPopularMovies()

 
  return (
    <section>
      <Hero title="Explore the Movies You Love" paragraph='Discover an endless collection of films. Whether you’re into blockbusters or indie gems, we have something for everyone.' showSearch={false}  />
      <ContainerSlidesMovies title="Popular Movies" data={popularMovies} showViewAll={true} hrefShowAll='/pages/popular'/>
      <ContainerSlidesMovies title="Top Rated Movies" data={topRateMovies} showViewAll={true} hrefShowAll='/pages/topRated'/>
   
    </section>
  );
};

export default Page;
