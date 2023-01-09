declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HTTP_PORT: number
      SEQ_KEY: string
      SEQ_PORT: number
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
