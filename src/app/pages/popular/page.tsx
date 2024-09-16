import Container from '@/app/components/layout/Container'
import GridCards from '@/app/components/layout/GridCards'
import Hero from '@/app/components/layout/Hero'
import Slide from '@/app/components/movie/Slide'
import { getMostPopularMovies } from '@/app/services/httpClient'

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