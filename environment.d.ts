declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_TMMDB_API: string;
      EXPO_PUBLIC_TMMDB_API_KEY: string;
      EXPO_PUBLIC_APPWRITE_API_KEY: string;
      EXPO_PUBLIC_APPWRITE_PROJECT_ID: string;
      EXPO_PUBLIC_APPWRITE_ENDPOINT: string;
      EXPO_PUBLIC_APPWRITE_DB_ID: string;
      EXPO_PUBLIC_APPWRITE_COLLECTION_ID: string;
    }
  }
}

export {};
