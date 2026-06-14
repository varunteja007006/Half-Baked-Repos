declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'local';
      DATABASE_URL: string;
    }
  }
}

// Convert the file into a module by adding an empty export
export {};
