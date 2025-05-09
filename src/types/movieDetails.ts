export interface MovieDetails {
    imdbId: string;
    title: string;
    description: string | null;
    releaseDate: string | null;
    budget: number;
    runtime: number | null;
    averageRating: number | null;
    genres: string | null;
    originalLanguage: string | null;
    productionCompanies: string | null;
  }
  