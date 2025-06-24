export const TMDB_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_TMMDB_API,
  API_KEY: process.env.EXPO_PUBLIC_TMMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMMDB_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query?: string;
}): Promise<Movie[]> => {
  const endPoint = query
    ? `${TMDB_CONFIG.baseURL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.baseURL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response?.ok) {
    throw new Error("Failed To Fetch", response.statusText);
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.baseURL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response?.ok) throw new Error("Failed To Fetch Movie Details");

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
