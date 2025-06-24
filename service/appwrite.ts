import { Client, Databases, ID, Query } from "react-native-appwrite";

export enum MVOVIE_COLLECTION_METRIC {
  searchTerm = "searchTerm",
  count = "count",
  posterURI = "posterURI",
  movieId = "movieId",
  title = "title",
}

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const db = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await db.listDocuments(databaseId, collectionId, [
      Query.equal(MVOVIE_COLLECTION_METRIC.searchTerm, query),
    ]);

    if (result.documents.length > 0) {
      const movieData = result.documents[0];
      await db.updateDocument(databaseId, collectionId, movieData.$id, {
        [MVOVIE_COLLECTION_METRIC.count]:
          movieData[MVOVIE_COLLECTION_METRIC.count] + 1,
      });
    } else {
      await db.createDocument(databaseId, collectionId, ID.unique(), {
        [MVOVIE_COLLECTION_METRIC.searchTerm]: query,
        [MVOVIE_COLLECTION_METRIC.movieId]: movie.id,
        [MVOVIE_COLLECTION_METRIC.count]: 1,
        [MVOVIE_COLLECTION_METRIC.posterURI]: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        [MVOVIE_COLLECTION_METRIC.title]: movie.title,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await db.listDocuments(databaseId, collectionId, [
      Query.limit(5),
      Query.orderDesc(MVOVIE_COLLECTION_METRIC.count),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
