🌐 API Endpoints
GET /movies?page=1
List all movies (paginated, 50 per page)

✅ returns: imdbId, title, genres, releaseDate, budget

GET /movies/:id
Get details of a movie by imdbId

✅ returns: imdbId, title, description, releaseDate, budget, runtime, averageRating, genres, originalLanguage, productionCompanies

GET /movies/year/:year?page=1&desc=true
List movies from a specific year (paginated)

✅ optional desc=true for descending order

GET /movies/genre/:genre?page=1
List movies by genre (paginated)

✅ genre matches genre name (case-insensitive)
