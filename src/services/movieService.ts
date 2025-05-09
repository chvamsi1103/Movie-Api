import  moviesDb  from '../db/moviesKnex';
import ratingsDb  from '../db/ratingsKnex';
import { MovieListItem } from '../types/movie';
import { MovieDetails } from '../types/movieDetails';

const PAGE_SIZE = 50;

export const fetchMovies = async (page: number): Promise<MovieListItem[]> => {
  const offset = (page - 1) * PAGE_SIZE;

  const rows = await moviesDb('movies')
    .select<MovieListItem[]>('imdbId', 'title', 'genres', 'releaseDate', moviesDb.raw('budget / 100 as budget'))
    .limit(PAGE_SIZE)
    .offset(offset);

  return rows;
};

export const fetchMovieDetails = async (imdbId: string): Promise<MovieDetails | null> => {
  const movie = await moviesDb('movies')
    .select(
      'movieId',
      'imdbId',
      'title',
      'overview',
      'releaseDate',
      'budget',
      'runtime',
      'genres',
      'language',
      'productionCompanies'
    )
    .where('imdbId', imdbId)
    .first();

  if (!movie) return null;

  const avgRatingRow = await ratingsDb('ratings')
    .where('movieId', movie.movieId)
    .avg<{ avgRating: number }>({ avgRating: 'rating' })
    .first();

  return {
    imdbId: movie.imdbId,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.releaseDate,
    budget: movie.budget / 100,
    runtime: movie.runtime,
    averageRating: avgRatingRow?.avgRating ?? null,
    genres: movie.genres,
    originalLanguage: movie.language,
    productionCompanies: movie.productionCompanies
  };
};

export const fetchMoviesByYear = async (year: string, page: number, desc = false): Promise<MovieListItem[]> => {
    const offset = (page - 1) * PAGE_SIZE;
    const order = desc ? 'desc' : 'asc';
  
    const rows = await moviesDb('movies')
    .select<MovieListItem[]>('imdbId', 'title', 'genres', 'releaseDate', moviesDb.raw('budget / 100 as budget'))
    .whereNotNull('releaseDate')
    .whereRaw("strftime('%Y', releaseDate) = ?", [year])
    .orderBy('releaseDate', order)
    .limit(PAGE_SIZE)
    .offset(offset);
  
  
    return rows;
  };
  export const fetchMoviesByGenre = async (genre: string, page: number): Promise<MovieListItem[]> => {
    const offset = (page - 1) * PAGE_SIZE * 10; // fetch more to filter in app
  
    const rows = await moviesDb('movies')
      .select<MovieListItem[]>('imdbId', 'title', 'genres', 'releaseDate', moviesDb.raw('budget / 100 as budget'))
      .limit(PAGE_SIZE * 10)
      .offset(offset);
  
    const filtered = rows.filter(row => {
      try {
        const genreArray = JSON.parse(row.genres ?? '[]');
        return genreArray.some((g: { name: string }) => g.name.toLowerCase() === genre.toLowerCase());
      } catch (e) {
        return false;
      }
    });

    return filtered.slice(0, PAGE_SIZE);
  };
  
  
