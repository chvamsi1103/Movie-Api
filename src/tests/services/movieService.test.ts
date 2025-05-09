import { fetchMovies, fetchMovieDetails, fetchMoviesByYear, fetchMoviesByGenre } from '../../services/movieService';
import moviesDb from '../../db/moviesKnex';
import ratingsDb from '../../db/ratingsKnex';

jest.mock('../../../src/db/moviesKnex');
jest.mock('../../../src/db/ratingsKnex');

const mockDb = moviesDb as any;
const mockRatingsDb = ratingsDb as any;

describe('fetchMoviesByYear', () => {
    it('returns movies filtered by year', async () => {
      const expected = [{ imdbId: 'tt123', title: 'Test', genres: 'Drama', releaseDate: '1999-10-10', budget: 100 }];
      
      mockDb.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        whereNotNull: jest.fn().mockReturnThis(), 
        whereRaw: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockResolvedValue(expected)
      }));
  
      const result = await fetchMoviesByYear('1999', 1);
      expect(result).toEqual(expected);
    });
  });
  

describe('fetchMovies', () => {
  it('returns list of movies', async () => {
    const expected = [{ imdbId: 'tt123', title: 'Movie 1', genres: 'Drama', releaseDate: '2020-01-01', budget: 100 }];

    mockDb.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockResolvedValue(expected)
      }));

    const result = await fetchMovies(1);
    expect(result).toEqual(expected);
  });
});

describe('fetchMoviesByGenre', () => {
    it('returns movies filtered by genre', async () => {
      const expected = [{ imdbId: 'ttDrama', title: 'GenreMovie', genres: 'Drama', releaseDate: '2021-06-01', budget: 100 }];
      
      mockDb.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(), 
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockResolvedValue(expected)
      }));
  
      const result = await fetchMoviesByGenre('Drama', 1);
    });
  });
  

describe('fetchMovieDetails', () => {
    it('returns movie details with average rating', async () => {
      const movieRow = {
        movieId: 1,
        imdbId: 'tt123',
        title: 'Movie 1',
        overview: 'desc',
        releaseDate: '2020-01-01',
        budget: 10000,
        runtime: 120,
        genres: 'Drama',
        language: 'en',
        productionCompanies: 'Studio'
      };
  
      const ratingRow = { avgRating: 4.5 };
  
      mockDb.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(), 
        first: jest.fn().mockResolvedValue(movieRow)
      }));
  
      mockRatingsDb.mockImplementation(() => ({
        where: jest.fn().mockReturnThis(),
        avg: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(ratingRow)
      }));
  
      const result = await fetchMovieDetails('tt123');
  
      expect(result).toEqual({
        imdbId: movieRow.imdbId,
        title: movieRow.title,
        description: movieRow.overview,
        releaseDate: movieRow.releaseDate,
        budget: movieRow.budget / 100,
        runtime: movieRow.runtime,
        averageRating: ratingRow.avgRating,
        genres: movieRow.genres,
        originalLanguage: movieRow.language,
        productionCompanies: movieRow.productionCompanies
      });
    });
  
    it('returns null if movie not found', async () => {
      mockDb.mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(), 
        first: jest.fn().mockResolvedValue(null)
      }));
  
      const result = await fetchMovieDetails('ttNotFound');
      expect(result).toBeNull();
    });
  });
  
