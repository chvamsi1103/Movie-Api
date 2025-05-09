import cors from 'cors';
import helmet from 'helmet';
import { Express } from 'express';

export const applySecurityMiddleware = (app: Express) => {
  app.use(helmet()); // adds security headers
  app.use(cors());   // allows all origins by default
};
