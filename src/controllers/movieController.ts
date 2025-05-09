import { Request, Response } from 'express';
import { fetchMovies, fetchMovieDetails,fetchMoviesByYear, fetchMoviesByGenre  } from '../services/movieService';
import { MovieListItem } from '../types/movie';
import { MovieDetails } from '../types/movieDetails';

export const listMovies = async (req: Request, res: Response<MovieListItem[] | { message: string }>) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const movies = await fetchMovies(page);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMovieDetails = async (req: Request, res: Response<MovieDetails | { message: string }>) => {
  const imdbId = req.params.id;
  const movie = await fetchMovieDetails(imdbId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

export const getMoviesByYear = async (req: Request, res: Response<MovieListItem[] | { message: string }>) => {
  const year = req.params.year;
  const page = parseInt(req.query.page as string) || 1;
  const desc = req.query.desc === 'true';

  try {
    const movies = await fetchMoviesByYear(year, page, desc);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies by year:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMoviesByGenre = async (req: Request, res: Response<MovieListItem[] | { message: string }>) => {
  const genre = req.params.genre;
  const page = parseInt(req.query.page as string) || 1;

  try {
    const movies = await fetchMoviesByGenre(genre, page);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};