import express from 'express';
import dotenv from 'dotenv';

import moviesRouter from './routes/movies';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { applySecurityMiddleware } from './middleware/security';
dotenv.config();

const app = express();

applySecurityMiddleware(app); 
  
app.use(express.json());
app.use(logger);
app.use('/movies', moviesRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
