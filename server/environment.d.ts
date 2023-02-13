declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HTTP_PORT: number
      SEQ_KEY: string
      SEQ_PORT: number
      ACCESS_SECRET: string
      REFRESH_SECRET: string
      ACCESS_TOKEN_EXPIRY_TIME: string
      REFRESH_TOKEN_EXPIRY_TIME: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
