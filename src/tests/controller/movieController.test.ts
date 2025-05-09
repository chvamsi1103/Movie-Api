import { listMovies, getMovieDetails, getMoviesByYear, getMoviesByGenre } from '../../controllers/movieController';
import * as movieService from '../../services/movieService';
import { Request, Response } from 'express';

jest.mock('../../services/movieService');

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('movieController unit tests', () => {
  afterEach(() => jest.clearAllMocks());

  it('listMovies returns movies in json', async () => {
    const movies = [{ imdbId: 'tt123', title: 'Test Movie' }];
    (movieService.fetchMovies as jest.Mock).mockResolvedValue(movies);

    const req = { query: { page: '1' } } as unknown as Request;
    const res = mockResponse();

    await listMovies(req, res);

    expect(movieService.fetchMovies).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(movies);
  });

  it('listMovies handles error', async () => {
    (movieService.fetchMovies as jest.Mock).mockRejectedValue(new Error('fail'));

    const req = { query: {} } as unknown as Request;
    const res = mockResponse();

    await listMovies(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });

  it('getMovieDetails returns movie json', async () => {
    const movie = { imdbId: 'tt123', title: 'Test Movie' };
    (movieService.fetchMovieDetails as jest.Mock).mockResolvedValue(movie);

    const req = { params: { id: 'tt123' } } as unknown as Request;
    const res = mockResponse();

    await getMovieDetails(req, res);

    expect(movieService.fetchMovieDetails).toHaveBeenCalledWith('tt123');
    expect(res.json).toHaveBeenCalledWith(movie);
  });

  it('getMovieDetails returns 404 if movie not found', async () => {
    (movieService.fetchMovieDetails as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: 'ttNotFound' } } as unknown as Request;
    const res = mockResponse();

    await getMovieDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
  });

  it('getMoviesByYear returns movies json', async () => {
    const movies = [{ imdbId: 'tt1999', title: 'Movie 1999' }];
    (movieService.fetchMoviesByYear as jest.Mock).mockResolvedValue(movies);

    const req = { params: { year: '1999' }, query: { page: '1', desc: 'true' } } as unknown as Request;
    const res = mockResponse();

    await getMoviesByYear(req, res);

    expect(movieService.fetchMoviesByYear).toHaveBeenCalledWith('1999', 1, true);
    expect(res.json).toHaveBeenCalledWith(movies);
  });

  it('getMoviesByYear handles error', async () => {
    (movieService.fetchMoviesByYear as jest.Mock).mockRejectedValue(new Error('fail'));

    const req = { params: { year: '1999' }, query: {} } as unknown as Request;
    const res = mockResponse();

    await getMoviesByYear(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });

  it('getMoviesByGenre returns movies json', async () => {
    const movies = [{ imdbId: 'ttDrama', title: 'Drama Movie' }];
    (movieService.fetchMoviesByGenre as jest.Mock).mockResolvedValue(movies);

    const req = { params: { genre: 'Drama' }, query: { page: '1' } } as unknown as Request;
    const res = mockResponse();

    await getMoviesByGenre(req, res);

    expect(movieService.fetchMoviesByGenre).toHaveBeenCalledWith('Drama', 1);
    expect(res.json).toHaveBeenCalledWith(movies);
  });

  it('getMoviesByGenre handles error', async () => {
    (movieService.fetchMoviesByGenre as jest.Mock).mockRejectedValue(new Error('fail'));

    const req = { params: { genre: 'Drama' }, query: {} } as unknown as Request;
    const res = mockResponse();

    await getMoviesByGenre(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
