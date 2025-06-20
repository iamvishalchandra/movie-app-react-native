declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_TMMDB_API: string;
      EXPO_PUBLIC_TMMDB_API_KEY: string;
    }
  }
}

export {};
