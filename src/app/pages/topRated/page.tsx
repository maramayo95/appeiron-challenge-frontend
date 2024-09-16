import Hero from '@/app/components/layout/Hero'
import Container from '@/app/components/layout/Container'
import GridCards from '@/app/components/layout/GridCards'
import { getTopRatedMovies } from '@/app/services/httpClient'
import Slide from '@/app/components/movie/Slide'


const TopRated =  async () => {
  const topRated = await getTopRatedMovies()

  return (
    <div>
      <Hero title="View the most top rated movies" paragraph="" showSearch={false}/>

      <Container>
        <GridCards>
            {topRated?.results.map(movie => (
              <Slide key={movie.id} data={movie}/>
            ))}
        </GridCards>
      </Container>

    </div>
  )
}

export default TopRated