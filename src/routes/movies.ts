import express from 'express';
import { listMovies,getMovieDetails,getMoviesByYear,getMoviesByGenre} from '../controllers/movieController';

const router = express.Router();

router.get('/', listMovies);
router.get('/:id', getMovieDetails);
router.get('/year/:year', getMoviesByYear);
router.get('/genre/:genre', getMoviesByGenre);

export default router;
