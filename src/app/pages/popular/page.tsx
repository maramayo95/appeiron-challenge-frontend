import Container from '@/app/components/layout/Container'
import GridCards from '@/app/components/layout/GridCards'
import Hero from '@/app/components/layout/Hero'
import Slide from '@/app/components/movie/Slide'
import { getMostPopularMovies } from '@/app/services/httpClient'

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Most Popular Movies',
    description: 'Discover the most popular movies currently trending.',
    openGraph: {
      title: 'Most Popular Movies',
      description: 'Discover the most popular movies currently trending.',
      images: [
        {
          url: '/path-to-your-popular-movies-image.jpg', // Cambia esto a la URL de la imagen que quieras usar
          width: 1200,
          height: 630,
          alt: 'Popular Movies',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Most Popular Movies',
      description: 'Discover the most popular movies currently trending.',
      images: ['/path-to-your-popular-movies-image.jpg'], // Cambia esto a la URL de la imagen que quieras usar
    },
  };
}

const Popular = async () => {
  const popularMovies = await getMostPopularMovies()

  return (
    <div>
      <Hero title='View the most popular movies' paragraph='' showSearch={false}  />

      <Container>
        <GridCards>
            {popularMovies?.results.map(movie => (
              <Slide key={movie.id} data={movie}/>
            ))}
        </GridCards>
      </Container>
    </div>
  )
}

export default Popular