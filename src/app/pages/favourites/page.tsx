
import GridCards from '@/app/components/layout/GridCards';
import Hero from '@/app/components/layout/Hero';
import Slide from '@/app/components/movie/Slide';
import { Movie } from '@/app/types/movieTypes';

const Favourites = async () => {
  const response = await fetch('http://localhost:3000/api/favorites');
  const favorites: Movie[] = await response.json();
  console.log(favorites)
  return (
    <div>
      <Hero title="Your favourite movies" paragraph='' showSearch={false} />
      <GridCards>
        {favorites.length > 0 ? (
          favorites.map(favorite => (
            <Slide key={favorite.id} data={favorite} />
          ))
        ) : (
          <h3 className='text-center'>There's no favorites movies</h3>
        )}
      </GridCards>
    </div>
  );
};

export default Favourites;
